/**
 * RSVP -> Google Sheet connector for the Naadham & Rishi wedding site.
 *
 * SETUP (do this while signed in to nadham23bijirajesh9720@gmail.com):
 * 1. Go to https://sheets.google.com and create a new spreadsheet.
 *    Rename it "Naadham & Rishi RSVPs" (or anything you like).
 * 2. In the sheet, add this header row in row 1:
 *    Timestamp | Name | Phone | Attending | Guests | Message
 * 3. Open Extensions -> Apps Script. Delete any starter code and paste
 *    in everything below this comment block. Save the project
 *    (e.g. name it "RSVP Handler").
 * 4. Click Deploy -> New deployment -> gear icon -> Web app.
 *    - Description: RSVP handler
 *    - Execute as: Me (nadham23bijirajesh9720@gmail.com)
 *    - Who has access: Anyone
 *    Click Deploy, then Authorize access when prompted (choose the same
 *    Google account, click Advanced -> Go to project (unsafe) if warned,
 *    since this is your own script).
 * 5. Copy the Web app URL it gives you (ends in /exec).
 * 6. In index.html, find the line:
 *       const RSVP_SHEET_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
 *    and paste your URL between the quotes.
 * 7. Every RSVP submitted on the site will now appear as a new row in
 *    this sheet automatically, in real time, AND an email notification
 *    will be sent to nadham23bijirajesh9720@gmail.com for each RSVP.
 *    (Sent from your own Gmail account via MailApp, no extra setup needed.)
 *
 * If you ever edit this script after the site is already live, choose
 * Deploy -> Manage deployments -> edit (pencil) -> New version -> Deploy,
 * so the existing /exec URL keeps working with your changes.
 */

// Where the "new RSVP" notification email is sent.
var NOTIFY_EMAIL = 'nadham23bijirajesh9720@gmail.com';

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || '',
    data.phone || '',
    data.attending || '',
    data.guests || '',
    data.message || ''
  ]);

  sendNotificationEmail(data);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendNotificationEmail(data) {
  var subject = 'New RSVP: ' + (data.name || 'Someone') + ' — ' + (data.attending || '');
  var body =
    'A new RSVP came in for Naadham & Rishi\'s wedding.\n\n' +
    'Name: ' + (data.name || '-') + '\n' +
    'Phone: ' + (data.phone || '-') + '\n' +
    'Attending: ' + (data.attending || '-') + '\n' +
    'Guests: ' + (data.guests || '-') + '\n' +
    'Message: ' + (data.message || '-') + '\n' +
    'Submitted: ' + (data.timestamp || new Date().toISOString()) + '\n\n' +
    'View the full guest list in the Google Sheet.';

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

// Optional: lets you open the /exec URL in a browser to sanity-check it's live.
function doGet(e) {
  return ContentService
    .createTextOutput('RSVP endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
