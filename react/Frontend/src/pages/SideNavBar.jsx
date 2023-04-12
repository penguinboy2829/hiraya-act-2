import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.svg";
import logout from "../assets/logout.svg";
import home from "../assets/home1.svg";
import layer from "../assets/layer2.svg";
import settings from "../assets/settings2.svg";
import admin from "../assets/admin-avatar.svg";
import "./SideNavBar.css";

const SideNavBar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const menuItems = [
		{
			text: "Home",
			icon: home,
			page: "/dashboard"
		},
		
		{
			text: "Project Page",
			icon: layer,
			page: "/dashboard/project"
		},
		
		{
			text: "Settings",
			icon: settings,
			page: "/settings"
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
				<Link to = "/">
					<img className="logout-icon" src = {logout} alt="Log out" srcset="" />
				</Link>
				
			</div>
		</div>
	);
};

export default SideNavBar;