import React from "react";

const Fotter = () => {
  return (
    <React.Fragment>
      <footer className="w3-center w3-padding-64 footer">
        <a href="#home" className="w3-button">
          <i className="fa fa-arrow-up w3-margin-right" />
          To the top
        </a>
        <div className="w3-xlarge w3-section">
          <i className="fa fa-facebook-official w3-hover-opacity" />
          <i className="fa fa-instagram w3-hover-opacity" />
          <i className="fa fa-snapchat w3-hover-opacity" />
          <i className="fa fa-pinterest-p w3-hover-opacity" />
          <i className="fa fa-twitter w3-hover-opacity" />
          <i className="fa fa-linkedin w3-hover-opacity" />
        </div>
        <p>Created By Reem Emad</p>
      </footer>
    </React.Fragment>
  );
};

export default Fotter;
