import React from "react";

const Fotter = () => {
  return (
    <React.Fragment>
      <footer className="myFooter">
        <a href="#home" className="top">
          <i className="fa fa-arrow-up w3-margin-right" />
          To the top
        </a>
        <p style={{ padding: "2% 0" }}>Created By: Reem Emad</p>
        <div className="w3-large icons">
          <i className="fa fa-facebook-official w3-hover-opacity" />
          <i className="fa fa-instagram w3-hover-opacity" />
          <i className="fa fa-snapchat w3-hover-opacity" />
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Fotter;
