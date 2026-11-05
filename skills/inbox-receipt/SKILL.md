---
name: inbox-receipt
description: >
  Prints an email "receipt" with message counts, busiest hour, top senders and the Reply-All Tax, the people-hours and money that pile-on replies cost everyone who had to read them. Trigger on "inbox receipt", "reply-all tax", "what does my email cost", "how many reply-alls do I get", "price my inbox", or when the user uploads a mail export. Reads a connected Gmail or Outlook account through its connector, read-only, or a Takeout .mbox or .eml file. Always asks for the hourly rate, or yearly pay to derive it, before computing money. Never sends, deletes, labels or archives anything. Not for triage (inbox-sweep) or drafting replies.
---

# Inbox Receipt

Email feels free, so nobody counts the cost of a reply-all to forty people. This skill counts it.

The failure it prevents: **an inbox habit with no price on it.**

---

## Step 1: Ask first

One short message, every question skippable, each with a default:

1. **Hourly rate.** "What average cost per person-hour should I use? A number is fine, or give your yearly pay and I will divide by 2,080." Say the result back. If declined, use 60 per hour and label it an assumption on the receipt.
2. **Seconds to read a reply.** Default 20.
3. **Period.** Default the last 90 days.
4. **Names.** "Will you post this? I will hide sender names." Default: hide when sharing.

Use pay figures for this receipt only. Never store them.

## Step 2: Get the mail, headers only

Use a connected mail account if one is available, searching by date range, or an uploaded .mbox or .eml file. Use only From, To, Cc, Date, Subject and labels. **Do not read message bodies.** Never send, delete, label, archive or mark anything.

If the user's own address is unknown, guess it from the Sent label, say so, and let them correct it.

## Step 3: Count

- Total, received, sent
- Busiest hour and weekday for received mail
- Top three senders by volume
- **Pile-on:** a reply or forward (subject starts Re, Fw or Fwd) with 5 or more distinct people on To and Cc
- **Reply-All Tax:** people on pile-ons times seconds per reply, in person-hours; money is person-hours times the rate

## Step 4: Print the receipt

```
           INBOX RECEIPT
   Aug 7, 2026 to Nov 5, 2026
----------------------------------------
MESSAGES                             700
RECEIVED                             560
SENT                                 140
BUSIEST HOUR                        4 am
----------------------------------------
           REPLY-ALL TAX
PILE-ONS (5+ PEOPLE)                  78
LARGEST PILE-ON                10 people
PERSON-HOURS TO READ                 3.7
TOTAL TAX                           $220
----------------------------------------
   Rate used: $60/hr, 20 s per reply
```

Print the rate and its source (given, converted or assumed), and the reading time. Offer the free browser version, which reads a Takeout file locally.

## Failure modes

- **Reading bodies.** Never. Headers are enough
- **Skipping the rate question.** Ask, and default visibly
- **Counting your own sent mail as received.** Check the address first
- **Presenting the tax as a real loss.** It is an estimate from a stated reading time
- **Leaking names.** Hide them when the user will post it

## Reference files

None. This skill is self-contained.
