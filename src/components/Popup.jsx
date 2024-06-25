import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popup1 = window.open('https://example.com');
  const popup2 = window.open('hst-business://com.splashtop.business?mac=4A:2F:8C:7E:9D:1B');

  const allowPopups = () => {
    window.open('hst-business://com.splashtop.business?mac=4A:2F:8C:7E:9D:1B');
  };

  const openPopups = () => {
    // Check if any of the popups are blocked
    if (!popup1 || popup1.closed || !popup2 || popup2.closed) {
      setShowPopup(true);
    }
  };

  const handleAllow = () => {
    allowPopups();
    // Add any logic here that needs to be executed when the user allows popups
    setShowPopup(false);
  };

  const handleCancel = () => {
    // Add any logic here that needs to be executed when the user cancels the popup
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <Modal title="Allow a new tab" open={showPopup} onOk={handleAllow} onCancel={handleCancel} okText="Allow">
          <p>Because of your pop-up blocker, AavGo need your permission to open Splashtop in new tab.</p>
        </Modal>
      )}
      <button onClick={openPopups}>test</button>
    </div>
  );
};

export default Popup;
