// ================================================================
//  PUNCHLINE — LEGAL MODAL
//  Handles Privacy Policy and Terms of Service popouts.
//  Public test
// ================================================================

const LEGAL_CONTENT = {

  privacy: {
    title: 'Privacy Policy',
    body: `
      <p><strong>Last updated: April 2025</strong></p>

      <h3>Who We Are</h3>
      <p>Punchline is a platform built for comedy creators to host their content, connect with fans, and manage their business. When you use Punchline, you're trusting us with your information and we take that seriously.</p>

      <h3>What We Collect</h3>
      <p>When you create an account, we collect your username, email address, and password (stored securely). If you choose to upload a profile photo or fill in additional profile details, that information is stored as part of your account. We do not collect payment card details directly; all payment processing is handled by Stripe, who have their own privacy policy.</p>

      <h3>How We Use Your Information</h3>
      <p>Your information is used to operate your account, we do not sell your personal data to third parties. If you opt in to our newsletter or promotional emails during signup, we'll use your email address for those communications, you can unsubscribe at any time.</p>

      <h3>Data Storage</h3>
      <p>Account data and page content you create on Punchline is stored in your browser's local storage. This means your data lives on your device and is not transmitted to external servers unless you are using a hosted version of the platform. We recommend not using Punchline on shared or public dveices.</p>

      <h3>Cookies</h3>
      <p>Punchline uses minimal browser storage to keep you logged in and remember your preferences. We do not use third-party tracking cookies or advertising cookies.</p>

      <h3>Changes to This Policy</h3>
      <p>We may update this policy from time to time. Continued use of Punchline after changes constitutes acceptance of the updated policy.</p>
    `
  },

  terms: {
    title: 'Terms of Service',
    body: `
      <p><strong>Last updated: April 2025</strong></p>

      <h3>Acceptance of Terms</h3>
      <p>By creating an account or using Punchline, you agree to these Terms of Service. If you do not agree, please do not use the platform. These terms apply to all users: both creators and fans.</p>

      <h3>Content Ownership</h3>
      <p>You retain full ownership of any content you upload or create on Punchline. By posting content, you grant Punchline a limited licence to display that content as part of operating the platform. You are responsible for ensuring that any content you post does not infringe on the intellectual property rights of others.</p>

      <h3>Acceptable Use</h3>
      <p>You agree not to use Punchline to post content that is illegal. We reserve the right to remove content or suspend accounts that violate these standards. Comedy can push boundaries but content that targets individuals with harassment or promotes physical violence is not allowed.</p>

      <h3>Subscriptions and Payments</h3>
      <p>Paid plans are billed on the cycle you select (monthly or annual). You may cancel at any time from your account settings, cancellation takes effect at the end of your current billing period. Refunds are issued at our discretion for annual plans cancelled within 14 days of purchase. All payments are processed securely by Stripe.</p>

      <h3>Merch and Creator Commerce</h3>
      <p>Creators using the merch and ticketing features are responsible for fulfilling orders and complying with applicable consumer protection laws. Punchline acts as a platform only and is not responsible for the quality or delivery of goods sold by creators.</p>

      <h3>Limitation of Liability</h3>
      <p>Punchline is provided "as is" without warranties of any kind. We are not liable for any indirect, or incidental damages arising from your use of the platform. Our total liability to you for any claim shall not exceed the amount you paid us in the three months prior to the claim.</p>

      <h3>Changes to These Terms</h3>
      <p>We may modify these terms at any time. We'll notify you of material changes via email or a notice on the platform. Continued use of Punchline after changes constitutes acceptance of the updated terms.</p>
    `
  }

};

// ================================================================
//  INJECT MODAL HTML IF NOT ALREADY PRESENT
// ================================================================
(function injectModal() {
  if (document.getElementById('legalModal')) return; // already exists

  const modal = document.createElement('div');
  modal.id = 'legalModal';
  modal.className = 'legal-overlay';
  modal.innerHTML = `
    <div class="legal-modal">
      <button class="legal-close" id="legalClose">×</button>
      <div id="legalContent"></div>
    </div>`;
  document.body.appendChild(modal);

  // Close on button or backdrop click
  document.getElementById('legalClose').addEventListener('click', closeLegal);
  modal.addEventListener('click', e => { if (e.target === modal) closeLegal(); });

  // Close on Escape key
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLegal(); });
})();

// ================================================================
//  OPEN / CLOSE
// ================================================================
function openLegal(type) {
  const data = LEGAL_CONTENT[type];
  if (!data) return;
  const content = document.getElementById('legalContent');
  content.innerHTML = `<h2 class="legal-title">${data.title}</h2>${data.body}`;
  document.getElementById('legalModal').classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeLegal() {
  document.getElementById('legalModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ================================================================
//  AUTO-WIRE FOOTER LINKS
//  Finds any <a href="#"> containing "Privacy" or "Terms" text
//  and wires them up automatically.
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('footer a').forEach(link => {
    const text = link.textContent.trim().toLowerCase();
    if (text.includes('privacy')) {
      link.href = '#';
      link.addEventListener('click', e => { e.preventDefault(); openLegal('privacy'); });
    } else if (text.includes('terms')) {
      link.href = '#';
      link.addEventListener('click', e => { e.preventDefault(); openLegal('terms'); });
    }
  });
});