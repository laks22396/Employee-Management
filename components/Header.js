import { useDispatch } from "react-redux";
import { PersonAddSVG } from "@/icons";
import { setModalOpen } from "@/store";

export function Header() {
	const dispatch = useDispatch();

	return (
		<header className="header">
			<h1 className="header__h1">
				Employee <span>Details</span>
			</h1>
			<button
				className="btn btn__primary btn__icon"
				onClick={() => {
					dispatch(setModalOpen(true));
				}}
			>
				<PersonAddSVG /> <span>Add new</span>
			</button>
		</header>
	);
}
