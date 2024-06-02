import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import RecipientsBadge from './RecipientsBadge';

export default function RecipientsDisplay({ recipients }) {
  const [truncatedEmails, setTruncatedEmails] = useState([]);
  const [numTruncated, setNumTruncated] = useState(0);
  const tdRef = useRef(null);
  const badgeWrapperRef = useRef(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [badgeWidth, setBadgeWidth] = useState(0);

  const updateWidths = () => {
    if (tdRef.current) {
      setAvailableWidth(tdRef.current.offsetWidth);
    }
    if (badgeWrapperRef.current) {
      setBadgeWidth(badgeWrapperRef.current.offsetWidth);
    }
  };

  useLayoutEffect(() => {
    // Initial width calculation
    updateWidths();

    // Recalculate width on window resize
    window.addEventListener('resize', updateWidths);

    // Cleanup event listener
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


  const ShowToolTipOnHover = () => {
    return (
      <div className="tooltip">
        Hello
      </div>
    )
  }

  

  return (
    <React.Fragment>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <div ref={tdRef} style={{ whiteSpace: 'nowrap', overflow: 'hidden',  maxWidth: '100%' }}>
          {truncatedEmails.join(', ')}
        </div>
        {numTruncated > 0 &&
          <div ref={badgeWrapperRef}>
            <RecipientsBadge numTruncated={numTruncated} />
          </div>
        }
      </div>
    </React.Fragment>
  );
}
