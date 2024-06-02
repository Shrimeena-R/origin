import React, { useEffect, useRef, useState } from 'react';
import RecipientsBadge from './RecipientsBadge';
import '../index.css'

const RecipientTooltip = ({ text, position }) => {
  return (
    <div className="badge-tooltip " style={{ position: 'fixed', top: position.top, left: position.left}}>
      <span>{text}</span>
    </div>
  );
};

export default function RecipientsDisplay({ recipients }) {
  const [truncatedEmails, setTruncatedEmails] = useState([]);
  const [numTruncated, setNumTruncated] = useState(0);
  const tdRef = useRef(null);
  const badgeWrapperRef = useRef(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [badgeWidth, setBadgeWidth] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});

  const updateWidths = () => {
    if (tdRef.current) {
      setAvailableWidth(tdRef.current.offsetWidth);
    }
    if (badgeWrapperRef.current) {
      setBadgeWidth(badgeWrapperRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, []);

  useEffect(() => {
    if (availableWidth === 0) return;

    const oneRowEmails = document.createElement('span');
    oneRowEmails.style.visibility = 'hidden';
    oneRowEmails.style.whiteSpace = 'nowrap';
    oneRowEmails.style.position = 'absolute';
    document.body.appendChild(oneRowEmails);

    const newTruncatedEmails = [];
    let count = 0;

    for (let i = 0; i < recipients.length; i++) {
      const newEmails = newTruncatedEmails.length ? newTruncatedEmails.join(', ') + ', ' + recipients[i] : recipients[i];
      oneRowEmails.textContent = newEmails;

      if (oneRowEmails.offsetWidth > availableWidth - badgeWidth) {
        break;
      }
      newTruncatedEmails.push(recipients[i]);
      count = i + 1;
    }

    setTruncatedEmails(newTruncatedEmails);
    setNumTruncated(recipients.length - count);

    document.body.removeChild(oneRowEmails);
  }, [recipients, availableWidth, badgeWidth]);

  const handleBadgeHover = (e) => {
    const rect = e.target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY + rect.height,
      left: rect.left + window.scrollX,
    });
    setShowTooltip(true);
  };

  const handleBadgeLeave = () => {
    setShowTooltip(false);
  };

  return (
    <React.Fragment>
      <div className='recipient-detail-outer'>
        <div ref={tdRef} className="truncate-email-box">
          {`${truncatedEmails.join(', ')}${numTruncated > 0 ? ', ...' : '' }`}
        </div>
        {numTruncated > 0 &&
          <div
            ref={badgeWrapperRef}
            onMouseEnter={handleBadgeHover}
            onMouseLeave={handleBadgeLeave}
            style={{ position: 'relative' }}
          >
            <RecipientsBadge numTruncated={numTruncated} />
            {showTooltip && (
              <RecipientTooltip text={recipients} position={tooltipPosition} />
            )}
          </div>
        }
      </div>
    </React.Fragment>
  );
}
