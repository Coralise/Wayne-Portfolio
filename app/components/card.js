"use client";

import React from 'react';
import styled from 'styled-components';

const Card = ({ children, card1Style, className }) => {

    const defaultCard1Style = {
        padding: "1rem",
        backgroundColor: "var(--background)",
        borderRadius: "20px",
        transition: "all .2s",
        backgroundColor: "transparent",
        height: "fit-content"
    }

    return (
        <div style={{...defaultCard1Style, ...card1Style}} className={`${className} hover:rounded-2xl hover:highlighter-shadow border-2 border-transparent hover:border-highlighter`}>
            {children}
        </div>
    );
}
export default Card;