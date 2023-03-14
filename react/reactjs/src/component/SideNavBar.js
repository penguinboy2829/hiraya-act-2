import React, { useState } from "react";
import "./SideNavBar.css";


const SideNavBar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const menuItems = [
		{
			text: "Home",
			icon: "icons/home1.svg",
		},
		
		{
			text: "Project Page",
			icon: "icons/layer2.svg",
		},
		
		{
			text: "Settings",
			icon: "icons/settings2.svg",
		},
	];
	return (
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="icons/logo1.svg" alt="" srcset="" />
							<h2>Workspace</h2>
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className="nav-menu">
					{menuItems.map(({ text, icon }) => (
						<a
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							href="#"
						>
							<img className="menu-item-icon" src={icon} alt="" srcset="" />
							{isExpanded && <p className="text">{text}</p>}
                            
						</a>
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt=""
							srcset=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">John Roy</p>
							<p className="nav-footer-user-position">Front End Developer</p>
						</div>
					</div>
				)}
				<img className="logout-icon" src="icons/logout.svg" alt="Log out" srcset="" />
			</div>
		</div>
	);
};

export default SideNavBar;