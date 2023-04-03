import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import logo1 from "./logo1.svg";
import logout from "./logout.svg";
import home from "./home1.svg";
import layer from "./layer2.svg";
import settings from "./settings2.svg";
import admin from "./admin-avatar.svg";
import "./SideNavBar.css";

const SideNavBar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const menuItems = [
		{
			text: "Home",
			icon: home,
			page: "/tixsys/dashboard"
		},
		
		{
			text: "Project Page",
			icon: layer,
			page: "/tixsys/dashboard/project"
		},
		
		{
			text: "Settings",
			icon: settings,
			page: "/tixsys/settings"
		},
	];
	return (
		<div
			className={
				isExpanded
					? "col-auto min-vh-100 side-nav-container"
					: "col-auto min-vh-100 side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src={logo1} alt="" srcset="" />
							<h2 id="app-name">Workspace</h2>
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
					{menuItems.map(({ text, icon,page }) => (
						<Link to = {page}>
							<a
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							href={page}
							>
								<img className="menu-item-icon" src={icon} alt="" srcset="" />
								{isExpanded && <p className="text">{text}</p>}	
							</a>
						</Link>
						
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src = {admin}
							alt=""
							srcset=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">John Roy</p>
							<p className="nav-footer-user-position">Front End Developer</p>
						</div>
					</div>
				)}
				<Link to = "/tixsys">
					<img className="logout-icon" src = {logout} alt="Log out" srcset="" />
				</Link>
				
			</div>
		</div>
	);
};

export default SideNavBar;