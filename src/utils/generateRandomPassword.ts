const generatePassword = () => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
	let password = "";
	for (let i = 0; i < 6; i++) {
		password += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return password;
};

export default generatePassword;
