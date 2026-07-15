// page.tsx mein import karein:
import { getConnectionStatus, toggleGoogleBusiness, toggleGmail } from './actions';

// useEffect mein:
const fetchStatus = async () => {
  const result = await getConnectionStatus();
  if (result.success) {
    setIsGoogleConnected(result.googleConnected);
    setIsGmailConnected(result.gmailConnected);
  }
};

// Button click par:
const handleToggleGoogle = async () => {
  const action = isGoogleConnected ? 'disconnect' : 'connect';
  const result = await toggleGoogleBusiness(action);
  if (result.success) {
    setIsGoogleConnected(result.googleConnected);
  }
};
