export default function () {
	function copyUrl(event) {
		navigator.clipboard.writeText(event.currentTarget.value).then(() => {
			alert("Lien copié dans le presse-papiers !");
		});
	}

	return (
		<>
			<div style={{ display: "flex" }}>
				<span>Lien de la partie :</span>
				<input type="text" value={window.location} onClick={copyUrl} readOnly />
			</div>
		</>
	);
}
