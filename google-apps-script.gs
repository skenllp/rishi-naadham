/**
 * RSVP -> Google Sheet connector for the Rishi & Naadham wedding site.
 *
 * SETUP (do this while signed in to rishi6393@gmail.com):
 * 1. Go to https://sheets.google.com and create a new spreadsheet.
 *    Rename it "Rishi & Naadham RSVPs" (or anything you like).
 * 2. In the sheet, add this header row in row 1:
 *    Timestamp | Name | Phone | Attending | Guests | Message
 * 3. Open Extensions -> Apps Script. Delete any starter code and paste
 *    in everything below this comment block. Save the project
 *    (e.g. name it "RSVP Handler").
 * 4. Click Deploy -> New deployment -> gear icon -> Web app.
 *    - Description: RSVP handler
 *    - Execute as: Me (rishi6393@gmail.com)
 *    - Who has access: Anyone
 *    Click Deploy, then Authorize access when prompted (choose the same
 *    Google account, click Advanced -> Go to project (unsafe) if warned,
 *    since this is your own script).
 * 5. Copy the Web app URL it gives you (ends in /exec).
 * 6. In index.html, find the line starting with:
 *       const RSVP_SHEET_ENDPOINT = "..."
 *    and replace the URL between the quotes with your new one.
 * 7. Every RSVP submitted on the site will now appear as a new row in
 *    this sheet automatically, in real time, AND an email notification
 *    will be sent to rishi6393@gmail.com for each RSVP.
 *    (Sent from your own Gmail account via MailApp, no extra setup needed.)
 *
 * NOTE: this must be created fresh under rishi6393@gmail.com — you can't
 * just change the email below and keep the old /exec URL, because that
 * old deployment lives under a different Google account
 * (nadham23bijirajesh9720@gmail.com) and only that account's owner can
 * edit or redeploy it. Follow steps 1-6 above to get a new URL tied to
 * rishi6393@gmail.com.
 *
 * If you ever edit this script after the site is already live, choose
 * Deploy -> Manage deployments -> edit (pencil) -> New version -> Deploy,
 * so the existing /exec URL keeps working with your changes.
 */

// Where the "new RSVP" notification email is sent.
var NOTIFY_EMAIL = 'rishi6393@gmail.com';

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
    'A new RSVP came in for Rishi & Naadham\'s wedding.\n\n' +
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
