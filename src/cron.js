import cron from "node-cron";
import Capsule from "./models/user.model.js";
import { sendEmail } from "./utils/email.js";

cron.schedule("0 0 * * *", async () => {
  console.log("Running email reminder job...");

  try {
    const now = new Date();
    const oneDayLater = new Date();
    oneDayLater.setDate(now.getDate() + 1); // 24 hours from now

    const capsules = await Capsule.find({
      unlockDate: { $gte: now, $lte: oneDayLater }, // Find capsules unlocking in 24 hours
    }).populate("user"); // Populate user to get email

    for (const capsule of capsules) {
      const emailContent = `
        <h2>Your Time Capsule Unlocks Soon!</h2>
        <p><strong>Title:</strong> ${capsule.title}</p>
        <p><strong>Description:</strong> ${capsule.description}</p>
        <p><strong>Unlock Date:</strong> ${new Date(capsule.unlockDate).toLocaleString()}</p>
        <p>Visit the app to unlock your capsule once the time arrives.</p>
      `;
 
      sendEmail(capsule.user.email, "Reminder: Your Time Capsule Unlocks Soon!", emailContent);
    }
  } catch (error) {
    console.error("Error in email reminder job:", error);
  }
});
   