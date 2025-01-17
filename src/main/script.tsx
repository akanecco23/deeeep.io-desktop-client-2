import "./styles.css";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

import { Icon } from "./components/Icon";

// Make sure script is running on Deeeep.io
if (!window.location.hostname.match(/(beta\.|alpha\.)?deeeep\.io/) || !document.documentElement.outerHTML) throw "";

// Create DDC menu button
const menuButton = document.querySelector(".sidebar.right > .container > .el-row > div")?.cloneNode(true) as HTMLDivElement;
menuButton.innerHTML = "";
document.querySelector(".sidebar.right > .container > .el-row")?.appendChild(menuButton);

const Button = ({ text, onClick, color }: { text: string; onClick: () => void; color: "gray" | "red" | "blue" | "emerald" }) => (
	<button className={`ddc-btn ${color}`} onClick={onClick} type="button">
		<span>
			<span>{text}</span>
		</span>
	</button>
);

const Menu = ({ visible, setVisible }: { visible: boolean; setVisible: (visible: boolean) => void }) => {
	const [opacity, setOpacity] = useState(0);
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (visible) {
			setShow(true);
			setTimeout(() => setOpacity(1), 50);
		} else {
			setOpacity(0);
			setTimeout(() => setShow(false), 300);
		}
	}, [visible]);

	return (
		<div
			className="ddc-modal-container"
			style={{
				display: show ? "" : "none",
				pointerEvents: show ? "auto" : "none",
				opacity,
			}}
		>
			<div className="ddc-modal">
				<button className="top-2 right-2 absolute text-[gray]" onClick={() => setVisible(false)} type="button">
					<Icon.Close width="1.125em" height="1.125em" />
				</button>
				<p className="ddc-modal-title">DDC Settings</p>
				<div>{/* Main content */}</div>
				<div className="ddc-modal-footer">
					<Button text="Close" onClick={() => setVisible(false)} color="gray" />
				</div>
			</div>
		</div>
	);
};
const MenuButton = () => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<button className="ddc-menu-btn" type="button" onClick={() => setVisible(true)}>
				<span>
					<Icon.Wrench width="1.7875em" height="1.7875em" />
					<span>DDC Settings</span>
				</span>
			</button>
			{createPortal(<Menu visible={visible} setVisible={setVisible} />, document.body)}
		</>
	);
};
const root = createRoot(menuButton);
root.render(<MenuButton />);
