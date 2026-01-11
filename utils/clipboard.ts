/**
 * Safely copies text to clipboard, with fallback for non-secure contexts.
 * @param text The text to copy
 * @returns Promise<boolean> - true if copy succeeded, false otherwise
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
    // Try modern Clipboard API first (works in secure contexts: HTTPS or localhost)
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.warn('Clipboard API failed, falling back to execCommand:', err);
        }
    }

    // Fallback for non-secure contexts (HTTP on IP addresses, etc.)
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        return successful;
    } catch (err) {
        console.error('Fallback clipboard copy failed:', err);
        return false;
    }
};
