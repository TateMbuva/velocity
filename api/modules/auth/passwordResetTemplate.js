const temp = (hash)=>{
	let _temp = `
<h1>Your Password is :</h1>
<p>${hash}</p>
<h4>Reset Your Password</h4>
<button>Reset Password</button>
`

	if(hash != null || hash != undefined){
		return _temp	
	}	
}; 




module.exports = temp