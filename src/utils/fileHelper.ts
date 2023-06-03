import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { FileResponse } from "types/File";

const downloadBlob = ({ fileName, file }: FileResponse) => {
	const link = document.createElement("a");

	if (file) {
		link.style.display = "none";
		link.setAttribute("href", URL.createObjectURL(file));
		link.setAttribute("download", fileName ? `${fileName}` : "Unnamed");
		document.body.appendChild(link);

		link.click();
		link.remove();
	}
};

const getFileNameFromMeta = (meta: FetchBaseQueryMeta) =>
	meta.response?.headers
		?.get("content-disposition")
		?.split("filename=")[1]
		.replace('"', "")
		.split(";")[0]
		.replace('"', "");

const fileHelper = {
	downloadBlob,
	getFileNameFromMeta,
};

export default fileHelper;
