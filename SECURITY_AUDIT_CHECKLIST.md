# Stripe Integration - Security Audit Checklist

Use this checklist to verify your Stripe integration is secure before going to production.

---

## 🔒 Environment Variables Security

### Development
- [ ] `.env.local` exists and contains your test keys
- [ ] `.env.local` is listed in `.gitignore`
- [ ] `.env.example` exists with placeholder values (safe to commit)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` starts with `pk_test_`
- [ ] `STRIPE_SECRET_KEY` starts with `sk_test_`
- [ ] No secret keys are hardcoded in source files
- [ ] No environment variables committed to Git history

### Production
- [ ] Production keys replace test keys in deployment environment
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` starts with `pk_live_`
- [ ] `STRIPE_SECRET_KEY` starts with `sk_live_`
- [ ] Webhook secret configured for production endpoint
- [ ] All team members removed test keys from local machines
- [ ] Old/rotated keys deactivated in Stripe Dashboard

---

## 🛡️ API Route Security

### Input Validation
- [ ] All user inputs validated before processing
- [ ] Amount validation (min/max limits enforced)
- [ ] Currency format validated (3-letter ISO code)
- [ ] Metadata sanitized (no injection attacks)
- [ ] Request body size limited
- [ ] Content-Type header verified

### Authentication & Authorization
- [ ] User authentication implemented before payment
- [ ] User can only access their own orders/carts
- [ ] Admin endpoints protected with proper auth
- [ ] API routes use POST (not GET) for sensitive operations
- [ ] CSRF protection enabled (Next.js default)

### Error Handling
- [ ] Generic error messages returned to client
- [ ] Sensitive data not exposed in errors
- [ ] Errors logged server-side with full context
- [ ] Stack traces not exposed in production
- [ ] Error monitoring/alerting configured

### Security Headers
- [ ] `X-Frame-Options: DENY` set
- [ ] `X-Content-Type-Options: nosniff` set
- [ ] `X-XSS-Protection: 1; mode=block` set
- [ ] `Strict-Transport-Security` configured (production)
- [ ] `Content-Security-Policy` configured

---

## 🔐 Webhook Security

### Signature Verification
- [ ] Webhook signature verified before processing
- [ ] `STRIPE_WEBHOOK_SECRET` configured
- [ ] Raw body used for verification (not parsed JSON)
- [ ] Signature verification errors logged
- [ ] Failed verifications return 400 status

### Event Processing
- [ ] Event types validated before processing
- [ ] Idempotency implemented (prevent duplicate processing)
- [ ] Event IDs logged for debugging
- [ ] Webhook retries handled properly
- [ ] Webhook endpoint returns 200 quickly (< 5 seconds)

### Testing
- [ ] Webhooks tested with Stripe CLI locally
- [ ] Webhook endpoint configured in Stripe Dashboard
- [ ] Test events processed successfully
- [ ] Failed signature test returns 400
- [ ] Production webhook endpoint uses HTTPS

---

## 💳 Payment Processing Security

### Client-Side
- [ ] Using Stripe Elements (PCI compliant)
- [ ] Card data never touches your server
- [ ] Only publishable key used client-side
- [ ] No secret key imported in client components
- [ ] Payment form uses HTTPS
- [ ] Client-side validation before submission

### Server-Side
- [ ] Payment amounts calculated server-side
- [ ] Client-provided amounts never trusted
- [ ] Order totals verified from database
- [ ] User identity verified before creating payment
- [ ] Payment metadata includes order tracking info
- [ ] Completed payments recorded in database

### Test Mode
- [ ] Test cards work in development
- [ ] Successful payment flow tested
- [ ] Failed payment flow tested
- [ ] Authentication required flow tested
- [ ] Declined card handling tested

---

## 🔍 Data Protection

### Sensitive Data
- [ ] No card numbers stored in database
- [ ] No CVV codes stored (even encrypted)
- [ ] PII encrypted at rest (if storing)
- [ ] Payment Intent IDs stored for reference
- [ ] Stripe Customer IDs stored securely
- [ ] Logs don't contain sensitive data

### Database Security
- [ ] Parameterized queries used (prevent SQL injection)
- [ ] User inputs sanitized before DB operations
- [ ] Database credentials in environment variables
- [ ] Database access restricted by IP (production)
- [ ] Regular backups configured
- [ ] Encryption at rest enabled

---

## 🌐 Network Security

### HTTPS/TLS
- [ ] HTTPS enabled in production
- [ ] HTTP requests redirected to HTTPS
- [ ] TLS 1.2 or higher enforced
- [ ] SSL certificate valid and not expired
- [ ] Mixed content warnings resolved

### CORS
- [ ] CORS policy configured properly
- [ ] Only trusted origins allowed
- [ ] Preflight requests handled
- [ ] Credentials policy set correctly

### Rate Limiting
- [ ] Rate limiting implemented on API routes
- [ ] Reasonable limits set (e.g., 10 req/min)
- [ ] Rate limit errors return 429 status
- [ ] Per-IP or per-user rate limits
- [ ] DDoS protection configured

---

## 📊 Monitoring & Logging

### Error Monitoring
- [ ] Error tracking service configured (e.g., Sentry)
- [ ] Payment errors logged with context
- [ ] Webhook failures monitored
- [ ] API route errors tracked
- [ ] Alerts configured for critical errors

### Security Logging
- [ ] Failed authentication attempts logged
- [ ] Suspicious activity monitored
- [ ] Payment anomalies detected
- [ ] Large payment amounts flagged
- [ ] Refund requests logged

### Audit Trail
- [ ] All payment events recorded
- [ ] User actions timestamped
- [ ] Webhook events stored
- [ ] Admin actions logged
- [ ] Logs retained for compliance period

---

## 🧪 Testing & Validation

### Unit Tests
- [ ] API routes have unit tests
- [ ] Input validation tested
- [ ] Error cases covered
- [ ] Webhook signature verification tested
- [ ] Amount calculation tested

### Integration Tests
- [ ] End-to-end payment flow tested
- [ ] Webhook processing tested
- [ ] Failed payment scenarios tested
- [ ] Refund flow tested (if implemented)
- [ ] Edge cases covered

### Security Tests
- [ ] SQL injection tested (should fail safely)
- [ ] XSS attempts tested (should be blocked)
- [ ] CSRF protection verified
- [ ] Invalid signatures rejected
- [ ] Rate limiting verified
- [ ] Authentication bypasses attempted (should fail)

---

## 📋 Compliance

### PCI DSS
- [ ] Using Stripe Elements (reduces PCI scope)
- [ ] No card data stored on servers
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Access logs maintained
- [ ] Regular security audits scheduled

### GDPR (if applicable)
- [ ] User consent obtained before payment
- [ ] Privacy policy includes payment processing
- [ ] Data retention policy defined
- [ ] User data deletion process implemented
- [ ] Data processing agreement with Stripe
- [ ] User can request payment data

### Other Regulations
- [ ] Local tax calculations implemented
- [ ] Regional regulations compliance verified
- [ ] Financial reporting configured
- [ ] Receipt generation implemented
- [ ] Refund policy documented

---

## 🚀 Production Deployment

### Pre-Production
- [ ] All test keys replaced with production keys
- [ ] Environment variables configured on hosting platform
- [ ] Database migrations completed
- [ ] Backup strategy implemented
- [ ] Rollback plan documented

### Configuration
- [ ] `NEXT_PUBLIC_APP_URL` set to production domain
- [ ] Stripe webhook endpoint updated to production URL
- [ ] Email notifications configured
- [ ] Customer support contact info added
- [ ] Terms of service updated

### Performance
- [ ] API routes optimized for speed
- [ ] Database queries optimized
- [ ] Caching strategy implemented
- [ ] CDN configured for static assets
- [ ] Load testing completed

### Documentation
- [ ] Technical documentation updated
- [ ] Team trained on payment flow
- [ ] Incident response plan documented
- [ ] Customer support playbook created
- [ ] Runbook for common issues

---

## 🔧 Post-Production

### Monitoring (First 24 Hours)
- [ ] Payment success rate monitored
- [ ] Error rates tracked
- [ ] Webhook delivery confirmed
- [ ] Performance metrics reviewed
- [ ] Customer feedback reviewed

### Ongoing Maintenance
- [ ] Weekly security updates
- [ ] Monthly dependency updates
- [ ] Quarterly security audits
- [ ] Annual penetration testing
- [ ] Continuous monitoring alerts

### Incident Response
- [ ] Incident response team identified
- [ ] Communication plan established
- [ ] Key rotation procedure documented
- [ ] Data breach response plan ready
- [ ] Customer notification templates prepared

---

## 📞 Emergency Contacts

### Stripe Support
- Dashboard: https://dashboard.stripe.com
- Support: https://support.stripe.com
- Status: https://status.stripe.com
- Security: security@stripe.com

### Your Team
- [ ] Technical lead contact info documented
- [ ] Security team contact info documented
- [ ] On-call rotation schedule created
- [ ] Escalation procedure defined

---

## ✅ Sign-Off

### Development Team
- [ ] Code reviewed by senior engineer
- [ ] Security review completed
- [ ] Documentation reviewed
- [ ] Tests passing

### Security Team
- [ ] Security audit completed
- [ ] Penetration testing passed
- [ ] Compliance verified
- [ ] Approved for production

### Management
- [ ] Legal approval obtained
- [ ] Business requirements met
- [ ] Risk assessment completed
- [ ] Go-live date confirmed

---

## 📊 Audit Results

**Date**: _________________

**Audited by**: _________________

**Results**: _________________

**Issues found**: _________________

**Remediation plan**: _________________

**Next audit date**: _________________

---

**Last Updated**: 2025-11-05
**Version**: 1.0.0
**Maintained by**: Security Team
