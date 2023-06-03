import { useState } from "react";

interface UseModalProps {
	initVisible?: boolean;
}

interface UseModalResponse {
	isOpen: boolean;
	open: () => void;
	close: () => void;
}

const useModal = ({ initVisible }: UseModalProps = {}): UseModalResponse => {
	const [isOpen, setIsOpen] = useState(initVisible ?? false);

	const close = () => {
		setIsOpen(false);
	};

	const open = () => {
		setIsOpen(true);
	};

	return {
		isOpen,
		open,
		close,
	};
};

export default useModal;
