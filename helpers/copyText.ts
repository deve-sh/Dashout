const copyText = (text: string) => {
	let tempInput = document.createElement("input");
	tempInput.value = text;
	document.body.appendChild(tempInput);
	tempInput.select();
	document.execCommand("copy");
	document.body.removeChild(tempInput);
};

export default copyText;
