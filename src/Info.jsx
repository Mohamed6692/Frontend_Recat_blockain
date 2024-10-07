import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Pour activer les tooltips
import { Tooltip } from 'bootstrap';
function TooltipIcon() {
    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
      }, []);

  return (
    <i
    className="bi bi-info-circle ms-2"
    style={{ color: '#34C759', cursor: 'pointer' }}
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    data-bs-html="true"
    data-bs-title="1 credit equals 2$.<br>The deposits are rounded in your favor."
  ></i>
  
  );
}

export default TooltipIcon;
