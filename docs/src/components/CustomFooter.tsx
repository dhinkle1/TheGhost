import React from "react";
import { FaSlack, FaDiscord, FaGithub } from "react-icons/fa";
import Translate from '@docusaurus/Translate';
import "../css/footer.css";

function CustomFooter() {
  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <div className="footer-icons">
          <a href="https://join.slack.com/t/openhands-ai/shared_invite/zt-34zm4j0gj-Qz5kRHoca8DFCbqXPS~f_A" target="_blank" rel="noopener noreferrer">
            <FaSlack />
          </a>
          <a href="https://discord.gg/ESHStjSjD4" target="_blank" rel="noopener noreferrer">
            <FaDiscord />
          </a>
          <a href="https://github.com/All-Hands-AI/TheGhost" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            <Translate id="footer.copyright" values={{ year: new Date().getFullYear() }}>
              {'Copyright © {year} All Hands AI, Inc'}
            </Translate>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default CustomFooter;
