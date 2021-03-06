const config = require('../../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../config/mongoose');
const User = db.User;
const UserProfile = db.UserProfile;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    createPartner,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.firstName })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
   
    // save user
    // create a userprofile for user
    await User.create(user, async (err, createdUser)=>{
        console.log('New User created : ')
        console.log(createdUser.id)
        //Create a UserProfile for user
        await createUserProfile(createdUser.id)

        if(err){
            console.log(`Error at creation : ${err}`)
        }

    })
}
//Create a UserProfile for user
//userId
function createUserProfile(userId) {
    
    return new Promise(async function(resolve, reject) {
        await UserProfile.create({ userId: userId }, (err, createdProfile)=>{
            if(err){
                reject(err)
            }else{
                console.log(createdProfile)
                resolve()
            }

        })
    })
    
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

//Register a new partner
async function createPartner(userParam){

    // validate
    if (await User.findOne({ email: userParam.firstName})) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    //save partner
    await User.create(user, (err, createdUser)=>{
        console.log('New User (Partner) created : ')
        console.log(createdUser)

        if(err){
            console.log(`Error at creation : ${err}`)
        }

    })

}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}