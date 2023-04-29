import React, { useState } from "react";
import { conectDropdown } from "./NavItems";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdownc() {
    const [dropdown, setDropdown] = useState(false);

    return (
    <>
        <ul
        className={dropdown ? "services-submenu clicked" : "services-submenu"}
        onClick={() => setDropdown(!dropdown)}
        >
        {conectDropdown.map((item) => {
            return (
            <li key={item.id}>
                <Link
                to={item.path}
                className={item.cName}
                onClick={() => setDropdown(false)}
                >
                {item.title}
                </Link>
            </li>
            );
        })}
        </ul>
    </>
    );
    }

export default Dropdownc;