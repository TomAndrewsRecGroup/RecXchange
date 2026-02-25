"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
  detailedAnswer?: string;
}

const faqs: FAQItem[] = [
  // Getting Started
  {
    category: "Getting Started",
    question: "What is RecXchange?",
    answer: "RecXchange is a recruiter collaboration platform where thousands of recruiters partner on placements and split fees automatically. Post roles to find candidates, or share candidates to find roles. Split fees 50/50, 60/40, or 70/30.",
    detailedAnswer: "RecXchange is a global network where recruiters work together instead of competing.\n\nHow it works:\n\nIf you have a role but no candidates:\nYou can post your role to the platform. Other recruiters see your role. They submit their candidates to you. When their candidate gets hired, you split the fee.\n\nIf you have a candidate but no role:\nYou can post your candidate to the platform. Other recruiters see your candidate. They match your candidate to their roles. When your candidate gets hired, you split the fee.\n\nThe platform creates contracts automatically. Both recruiters sign digitally. When the placement happens, you split the fee according to your agreement.\n\nThe network size:\n15,000+ recruiters across the world. Access to 270 million candidate profiles. Roles in UK, USA, Europe, Africa, Middle East, and Australia. Industries include Engineering, Healthcare, Tech, HR, Sales, and Finance."
  },
  {
    category: "Getting Started",
    question: "How does RecXchange make me money?",
    answer: "You make money by partnering with other recruiters. If you have a role but no candidates, post it and partner with recruiters who have matching candidates. If you have a candidate but no role, post them and partner with recruiters who have matching roles. Both parties split the fee when the placement is made.",
    detailedAnswer: "RecXchange creates two main ways to earn money:\n\nWay 1 - You have open roles:\nPost your client's role to the platform. Other recruiters see the role. They submit their best candidates. You interview the candidates with your client. When a candidate gets hired, you split the fee.\n\nExample: Total fee is $10,000. You agree to 50/50 split. You earn $5,000. Your partner earns $5,000.\n\nWay 2 - You have available candidates:\nPost your candidate to the platform. Other recruiters see your candidate. They match your candidate to their client roles. When your candidate gets hired, you split the fee.\n\nExample: Total fee is $8,000. You agree to 60/40 split (you get 60% because it's your candidate). You earn $4,800. Your partner earns $3,200.\n\nAverage earnings:\nThe average placement fee across RecXchange is $7,000. On a 50/50 split, you earn $3,500 per placement. On a 60/40 split, you earn $4,200 per placement. On RecX Direct roles (70% split), you earn $4,900 per placement.\n\nHow often recruiters earn:\nMost active recruiters make 2-5 placements per quarter. That means $7,000 to $17,500 earned every 3 months. Some very active recruiters make 10+ placements per quarter.\n\nTotal fees available right now:\n$750,000 in total placement fees across 100+ live roles on the platform."
  },
  {
    category: "Getting Started",
    question: "How much does it cost?",
    answer: "Entry tier is $1/month (5 tokens). Lite is $99/month (150 tokens). Pro is $250/month (400 tokens). Teams is custom pricing for agencies with 5+ recruiters. One placement typically pays for 5-12 months of membership.",
    detailedAnswer: "RecXchange has four membership tiers:\n\nEntry Tier - $1 per month:\nYou get 5 tokens per month. Perfect for testing the platform. Very low risk to try. Good if you want to see how it works before committing.\n\nLite Tier - $99 per month:\nYou get 150 tokens per month. Designed for serious recruiters. Most recruiters use 20-50 tokens per month, so 150 is plenty.\n\nReturn on investment example:\nYou pay $99 per month. You make one placement at 50/50 split. Total fee is $7,000. Your share is $3,500. $3,500 earned ÷ $99 monthly cost = 35 months paid for with one placement.\n\nPro Tier - $250 per month:\nYou get 400 tokens per month. You get instant access to RecX Direct roles (Lite members wait 7 days). You can earn up to 70% on RecX Direct placements.\n\nReturn on investment example:\nYou pay $250 per month. You make one RecX Direct placement at 70% split. Total fee is $7,000. Your share is $4,900 (70%). $4,900 earned ÷ $250 monthly cost = 19 months paid for with one placement.\n\nTeams Tier - Custom pricing:\nFor agencies with 5 or more recruiters. Shared token pools. Shared databases. Team management tools. Contact us for pricing.\n\nImportant note about platform fees:\nRecXchange charges ZERO platform fees on placements. You keep 100% of your agreed split. Many other platforms charge 5-20% fees on every placement. RecXchange only charges the monthly membership fee. No hidden costs. No surprise fees."
  },
  
  // For Recruiters
  {
    category: "For Recruiters",
    question: "What are tokens?",
    answer: "Tokens let you participate in RecXchange. 1 token = post 1 role to the community OR submit 1 candidate to a collaborative role. Entry gives you 5 tokens/month, Lite gives 150, Pro gives 400.",
    detailedAnswer: "Tokens are how you take action on RecXchange. Think of them like credits.\n\nHow tokens work:\nEach action costs 1 token. Posting a role to find candidates costs 1 token. Submitting a candidate to someone else's role costs 1 token.\n\nExample for Lite members ($99/month with 150 tokens):\nYou can post 150 roles, OR submit 150 candidates, OR any combination that adds up to 150 actions. You could post 50 roles and submit 100 candidates. That uses all 150 tokens.\n\nHow many tokens do recruiters actually use?\nMost recruiters use 20-50 tokens per month. Very active recruiters use 100-200 tokens per month. If you use more than 150 tokens consistently, you should upgrade to Pro (400 tokens).\n\nWhat if you run out of tokens?\nYou can upgrade to a higher tier to get more tokens immediately. You can buy additional tokens in packs: 10 tokens for $10, 40 tokens for $35, 100 tokens for $75, or 500 tokens for $300. You can wait until your next billing cycle when your tokens refresh.\n\nDo unused tokens expire?\nYes. Tokens reset every month on your billing date. If you don't use all 150 tokens this month, they don't carry over to next month. Exception: If you upgrade mid-month, your unused tokens from the lower tier roll over for 30 days."
  },
  {
    category: "For Recruiters",
    question: "How do split fees work?",
    answer: "You and your partner agree on split terms before sharing any data. Common splits are 50/50, 60/40, or 70/30. Once agreed, both parties sign an auto-generated split fee agreement. When the placement is made, fees are split according to the contract.",
    detailedAnswer: "Split fees follow a simple 6-step process:\n\nStep 1 - You find a match:\nYou see a role or candidate on the platform that matches what you have. You think this could be a good partnership.\n\nStep 2 - You request to partner:\nYou click 'Request Partnership.' The other recruiter receives a notification. They review your profile. They look at your rating and reviews.\n\nStep 3 - You agree on the split:\nBoth of you discuss the split percentage. Common splits: 50/50 (equal partnership), 60/40 (one recruiter has the client relationship), 70/30 (RecX Direct roles). You both agree on the percentage.\n\nStep 4 - The contract is created automatically:\nRecXchange creates a legal contract. The contract includes: both recruiter names, both company names, the role details, the candidate details, the agreed split percentage, the date and time, and a permanent timestamp. Both of you sign the contract digitally.\n\nStep 5 - You share details AFTER signing:\nOnly after the contract is signed, you share private information. You share candidate contact details. You share client contact details. You share full CVs and job descriptions. This protects both parties.\n\nStep 6 - The placement is made, fees are split:\nYour candidate gets hired. Each recruiter invoices their own client for their portion.\n\nExample with numbers:\nTotal fee is $10,000. You agreed 50/50 split. You invoice your client for $5,000. Your partner invoices the candidate's employer for $5,000. RecXchange takes 0% platform fee. You keep your full $5,000. Your partner keeps their full $5,000."
  },
  {
    category: "For Recruiters",
    question: "Are my clients protected?",
    answer: "Yes. Your client details stay hidden until you approve the partnership. You control what information is shared and when.",
    detailedAnswer: "Client protection is a core feature of RecXchange.\n\nWhat information is hidden before you approve a partnership:\n\nCompany name is hidden. Instead of 'Apple Inc.' it shows 'Tech Company in California.'\n\nExact location is hidden. Instead of the full office address, it shows 'San Francisco Area.'\n\nContact details are completely hidden. Email addresses, phone numbers, and website URLs are not shown.\n\nHiring manager's name is hidden. You see 'Hiring Manager' instead of their real name.\n\nWhat information IS visible to other recruiters:\n\nJob title (e.g., 'Senior Software Engineer'). Industry (e.g., 'Technology' or 'Healthcare'). General location (e.g., 'London, UK'). Salary range (e.g., '$80,000 - $100,000'). Key requirements (e.g., '5+ years Python experience').\n\nWhen do you share full client details?\n\nYou decide when to reveal any information. Most recruiters share full details only after:\n\nStep 1: The split fee contract is signed by both parties.\nStep 2: You've reviewed the partner recruiter's rating and reviews.\nStep 3: The candidate has passed initial screening.\nStep 4: You feel comfortable with your partner's professionalism.\n\nYou are always in control. You can choose to NOT share details if you're not comfortable. No one can force you to reveal your client information."
  },
  {
    category: "For Recruiters",
    question: "Are my candidates protected?",
    answer: "Yes. Candidate details are hidden until you approve the match. You decide when to reveal contact information to your partner recruiter.",
    detailedAnswer: "Candidate protection works exactly like client protection.\n\nWhat information is hidden before you approve a partnership:\n\nFull name is masked. Instead of 'John Anderson' it shows 'John A.' or 'J. Anderson.'\n\nEmail and phone are completely hidden. No one can contact your candidate directly.\n\nCurrent employer is hidden. It shows industry instead of company name (e.g., 'Works in Tech Industry').\n\nLinkedIn profile is hidden. Other recruiters cannot search for your candidate on LinkedIn.\n\nFull CV is hidden. Your candidate's complete CV is not visible.\n\nWhat information IS visible to other recruiters:\n\nJob title (e.g., 'Senior Accountant'). Years of experience (e.g., '7 years'). Key skills (e.g., 'Excel, SAP, Financial Reporting'). Location (city level only, e.g., 'New York, USA'). Salary expectations (e.g., 'Looking for $90,000 - $110,000'). Notice period (e.g., '2 weeks notice').\n\nWhen do you share full candidate details?\n\nYou decide when to reveal any information. Most recruiters share full details only after:\n\nStep 1: You've signed the split fee contract with your partner.\nStep 2: You've verified the role is real and suitable for your candidate.\nStep 3: Your candidate has given you permission to submit them.\nStep 4: You trust your partner recruiter based on their ratings and reviews.\n\nImportant reminder: Your candidate's full CV is never shared until you explicitly choose to share it. You protect your candidate's privacy at all times."
  },
  {
    category: "For Recruiters",
    question: "What if two recruiters submit the same candidate?",
    answer: "RecXchange timestamps every submission. If two recruiters submit the same candidate to the same role, the first timestamp wins. No arguments. The system decides.",
    detailedAnswer: "Duplicate submissions are resolved automatically by timestamp. This is fair and transparent.\n\nHow the timestamp system works:\n\nEvery submission gets a permanent timestamp. The timestamp records the exact date, time, and second. The timestamp is stored permanently and cannot be changed. This is similar to blockchain technology.\n\nExample of how disputes are resolved:\n\nRecruiter A submits 'John Smith' to 'Tech Company Role #123' at 10:00:00 AM on January 15th.\n\nRecruiter B submits the same 'John Smith' to the same 'Tech Company Role #123' at 10:00:15 AM on January 15th (15 seconds later).\n\nRecruiter A wins automatically because they submitted first.\n\nWhat happens to Recruiter B?\n\nThe system immediately alerts Recruiter B: 'This candidate was already submitted to this role 15 seconds ago. Your submission cannot proceed.'\n\nRecruiter B's token is refunded immediately. They don't lose their token for the duplicate attempt.\n\nRecruiter B can submit the same candidate to different roles. The duplicate rule only applies to the same candidate + same role combination.\n\nWhy this system is fair:\n\nNo arguments between recruiters. The first timestamp always wins. Both recruiters can see the exact time of submission. This is legally binding and stored permanently. It protects the recruiter who acted first.\n\nImportant note: The first person to submit always has the exclusive right to represent that candidate for that specific role. This prevents conflicts and protects everyone fairly."
  },
  
  // RecX Direct
  {
    category: "RecX Direct",
    question: "What is RecX Direct?",
    answer: "RecX Direct is a service where end clients post their roles for free. Thousands of recruiters can work on these roles, and clients only deal with one point of contact (Andrews Recruitment Group or Senior RecXchange Account Managers).",
    detailedAnswer: "RecX Direct is RecXchange's own recruitment service for hiring companies.\n\nHow it works for hiring companies:\n\nA company needs to hire someone. Instead of hiring 10 different recruitment agencies, they post their role to RecX Direct for free. Then 15,000+ recruiters across the world can see the role and submit candidates.\n\nThe company only talks to ONE person - an Account Manager from RecXchange. The Account Manager handles all recruiter submissions. The Account Manager screens all candidates. The Account Manager presents only the best candidates to the client.\n\nHow it works for recruiters:\n\nYou see RecX Direct roles in the platform. You submit your best candidates. You don't need to do business development with the client. The client relationship is managed by RecXchange. You earn up to 70% of the placement fee (much higher than the typical 50% split).\n\nComparison to other services:\n\nRecX Direct is like having an RPO (Recruitment Process Outsourcing) service. But with agency-style contingency terms. The client only pays when someone is hired. No upfront fees. No retainer fees. Pay only for results.\n\nGeographic coverage:\n\nRoles are available in: UK, USA, Europe, Africa, Middle East, and Australia.\n\nIndustries covered:\n\nEngineering (civil, mechanical, electrical, software). Healthcare (doctors, nurses, medical staff). Tech (developers, data scientists, product managers). HR (talent managers, recruiters, HR directors). Sales (account executives, sales directors). Finance (accountants, CFOs, financial analysts). And many more specialist industries.\n\nTotal value of RecX Direct roles:\n\n$750,000 in total placement fees available right now across 100+ live RecX Direct roles. Average fee per role is $7,000."
  },
  {
    category: "RecX Direct",
    question: "How do I access RecX Direct roles?",
    answer: "Pro members get instant access to RecX Direct roles as soon as they're posted. Lite members get access 7 days after posting. Entry members get access 30 days after posting (if applications are still being considered).",
    detailedAnswer: "RecX Direct access is tiered by membership level. This rewards higher-paying members with faster access.\n\nPro Members ($250 per month):\n\nYou get instant access. You see RecX Direct roles the exact moment they're posted. You can submit candidates immediately. You have the best chance to fill the role first. You earn up to 70% of the placement fee.\n\nExample: A new RecX Direct role is posted at 9:00 AM. As a Pro member, you see it at 9:00 AM. You can submit your candidate right away.\n\nLite Members ($99 per month):\n\nYou get access 7 days after the role is posted. Most roles are still open at 7 days. Many roles take 30-60 days to fill, so 7 days is not a big disadvantage. You still have a good chance to submit candidates and earn up to 70%.\n\nExample: A new RecX Direct role is posted on January 1st. As a Lite member, you see it on January 8th (7 days later). You can then submit your candidate.\n\nEntry Members ($1 per month):\n\nYou get access 30 days after the role is posted. But only if the role is still accepting candidates. Some roles will be filled by then. Many senior or niche roles take 60-90 days to fill, so you still have opportunities. You can still earn up to 70% if your candidate is selected.\n\nExample: A new RecX Direct role is posted on January 1st. As an Entry member, you see it on January 31st (30 days later). If the role is still open, you can submit your candidate.\n\nWhy this tiered access exists:\n\nIt ensures Pro members get the best opportunities. They pay more, so they get faster access. It still allows everyone to participate. Even Entry members can access roles after 30 days. It's fair and transparent - everyone knows the rules.\n\nRecommendation:\n\nIf you're serious about earning money on RecXchange, upgrade to Lite or Pro. The faster access to RecX Direct roles (70% splits) pays for itself very quickly."
  },
  {
    category: "RecX Direct",
    question: "What's the split on RecX Direct placements?",
    answer: "Standard RecX Direct splits are up to 70% to the recruiter who makes the placement. The exact split depends on your tier and the specific role.",
    detailedAnswer: "RecX Direct offers significantly higher splits than typical recruiter collaboration.\n\nStandard split on RecX Direct:\n\nUp to 70% goes to the recruiter who makes the placement (you). 30% goes to RecXchange for managing the client relationship, screening candidates, and handling contracts.\n\nComparison with numbers:\n\nOn a typical 50/50 split: Total fee is $7,000. You earn $3,500.\n\nOn a RecX Direct 70% split: Total fee is $7,000. You earn $4,900. That's $1,400 MORE per placement compared to a 50/50 split.\n\nHow splits vary by role:\n\nSome roles offer 60% split. Some roles offer 65% split. Some roles offer 70% split (the maximum).\n\nHigher-value roles typically offer higher splits. Example: A $15,000 placement might offer 70% ($10,500 to you).\n\nHarder-to-fill positions typically offer higher splits. Example: A very specialized engineering role might offer 70%.\n\nYou always see the exact split percentage before you submit any candidates. No surprises. No hidden fees.\n\nExample calculation:\n\nTotal placement fee: $10,000. RecX Direct split: 70%. Your earnings: $7,000 (70% of $10,000). RecXchange receives: $3,000 (30% of $10,000). Platform fee charged to you: $0.\n\nImportant reminder:\n\nRecXchange takes 0% platform fees. If a role says you get 70%, you truly get exactly 70% of the total fee. No deductions. No hidden costs. You keep every dollar of your agreed split."
  },
  
  // Tokens & Pricing
  {
    category: "Tokens & Pricing",
    question: "Can I upgrade or downgrade my tier?",
    answer: "Yes. You can switch between tiers at any time. Your unused tokens roll over for 30 days when you upgrade.",
    detailedAnswer: "You have complete flexibility to change tiers at any time.\n\nHow upgrading works:\n\nYou can upgrade from Entry to Lite, or Lite to Pro at any time. When you upgrade, your unused tokens from the lower tier roll over for 30 days.\n\nExample of upgrading:\n\nYou're currently on Lite ($99/month). You get 150 tokens per month. You've used 50 tokens this month. You have 100 tokens remaining. You decide to upgrade to Pro ($250/month). You immediately get all 400 Pro tokens. PLUS your remaining 100 Lite tokens roll over. You now have 500 total tokens for this month (400 Pro + 100 Lite).\n\nHow downgrading works:\n\nYou can downgrade at any time. If you downgrade mid-month, you keep your current tier's benefits until the end of your billing cycle. Then the lower tier starts at the beginning of the next billing cycle.\n\nExample of downgrading:\n\nYou're currently on Pro ($250/month). Today is January 15th. Your billing date is January 1st. You decide to downgrade to Lite ($99/month). You keep all Pro benefits until January 31st (end of current billing cycle). On February 1st, your Lite tier starts. You now pay $99/month and get 150 tokens.\n\nPausing your membership:\n\nYou cannot pause your membership completely. But you can downgrade to Entry tier ($1/month) if you need a break. This keeps your account active. You keep your profile, ratings, and reviews. You only pay $1 per month. You can upgrade again at any time.\n\nCommon upgrade path:\n\nMost recruiters start on Entry ($1/month) to test the platform. They see it works and upgrade to Lite ($99/month). They make a few placements and upgrade to Pro ($250/month) for instant RecX Direct access and higher earnings. They stay on Pro long-term because the 70% splits pay for the membership very quickly."
  },
  {
    category: "Tokens & Pricing",
    question: "What happens if I run out of tokens?",
    answer: "You can upgrade to a higher tier mid-month to get more tokens, purchase additional tokens in blocks of 10, 40, 100, or 500 from the RecXchange shop inside the platform, or wait until your tokens refresh at the start of the next billing cycle.",
    detailedAnswer: "If you run out of tokens, you have three clear options:\n\nOption 1 - Upgrade your tier:\n\nIf you're on Entry (5 tokens), upgrade to Lite (150 tokens) or Pro (400 tokens). If you're on Lite (150 tokens), upgrade to Pro (400 tokens). You get the new tokens immediately. Your unused tokens from the lower tier roll over for 30 days. This is the best option if you consistently run out of tokens.\n\nExample: You're on Entry with 0 tokens left. You upgrade to Lite. You immediately get 150 new tokens. You can continue posting roles and submitting candidates right away.\n\nOption 2 - Buy token packs:\n\nInside your RecXchange dashboard, visit the Shop. You can buy token packs:\n\n10 tokens for $10 ($1 per token). 40 tokens for $35 ($0.88 per token). 100 tokens for $75 ($0.75 per token). 500 tokens for $300 ($0.60 per token).\n\nPurchased tokens never expire. They don't reset at the end of the month. You can use them whenever you need them.\n\nExample: You're on Lite but you've used all 150 tokens this month. You buy a pack of 40 tokens for $35. You now have 40 tokens to use immediately. Next month, your 150 Lite tokens refresh as normal.\n\nOption 3 - Wait for monthly reset:\n\nYour tokens refresh automatically on your billing date. If you joined RecXchange on the 15th of the month, your tokens reset on the 15th of every month.\n\nExample: You joined on January 15th. You're on Lite (150 tokens). You've used all 150 tokens by January 28th. You wait until February 15th. On February 15th, you get 150 new tokens automatically.\n\nHow many tokens do most recruiters use?\n\nMost recruiters on Lite (150 tokens) use about 20-50 tokens per month. Very active recruiters use 100-200 tokens per month. If you consistently use more than 150 tokens, you should upgrade to Pro (400 tokens). If you consistently use more than 400 tokens, consider the Teams plan (custom token pools for agencies)."
  },
  {
    category: "Tokens & Pricing",
    question: "Do I pay anything when I make a placement?",
    answer: "No platform fees on placements. You keep 100% of your agreed split fee. RecXchange only charges the monthly membership fee.",
    detailedAnswer: "RecXchange has ZERO platform fees on placements. This is a huge advantage.\n\nWhat you pay to RecXchange:\n\nMonthly membership fee only: Entry tier: $1 per month. Lite tier: $99 per month. Pro tier: $250 per month. Teams tier: Custom pricing.\n\nThat's it. Nothing else.\n\nWhat you DON'T pay to RecXchange:\n\nNo fees on placements. No percentage of your earnings. No transaction fees. No success fees. No hidden costs.\n\nExample with real numbers:\n\nTotal placement fee: $10,000. You agreed to 50/50 split with your partner. Your share: $5,000. You invoice your client for $5,000. You receive $5,000 from your client. RecXchange charges you: $0. You keep the full $5,000.\n\nComparison to other platforms:\n\nMany freelancer sites charge 10-20% of every transaction. Example: You earn $5,000, the platform takes $500-$1,000, you keep $4,000-$4,500.\n\nSome recruitment platforms charge 5% of placement fees. Example: You earn $5,000, the platform takes $250, you keep $4,750.\n\nJob boards charge per posting. Example: $200-$500 per role posted.\n\nRecXchange charges ONLY the flat monthly membership. Make 1 placement per month or 100 placements per month - you never pay more than your membership fee.\n\nWhy this matters for ROI (Return on Investment):\n\nYou're on Lite ($99/month). You make one placement. Total fee: $7,000. Your 50/50 split: $3,500 earned. Cost to RecXchange: $99 for the entire month. Your profit: $3,401 ($3,500 - $99). One placement pays for 35+ months of membership. This is exceptional value and why many recruiters love RecXchange."
  },
  
  // Trust & Protection
  {
    category: "Trust & Protection",
    question: "How are split fee agreements enforced?",
    answer: "RecXchange auto-generates legally binding split fee agreements when you partner with another recruiter. Both parties sign digitally. The agreement is timestamped and stored on the platform.",
    detailedAnswer: "Split fee agreements are legally enforceable contracts created automatically by the platform.\n\nWhat's included in the contract:\n\nBoth recruiters' full names. Both company names (if applicable). The specific role: client company name (or masked name), job title, location. The specific candidate: full name. The agreed split percentage (e.g., 50/50 or 60/40). The total estimated placement fee. The date and time the agreement was made. A permanent timestamp (cannot be changed). Both parties' digital signatures.\n\nHow the signing process works:\n\nStep 1: You and your partner discuss and agree to work together. Step 2: You both agree to the split percentage in the platform. Step 3: RecXchange automatically generates a contract with all details. Step 4: You both review the contract. Step 5: You both click 'Sign Agreement.' Step 6: Your digital signatures are recorded with a timestamp. Step 7: The contract is stored permanently in the platform. Step 8: Both parties receive a PDF copy via email immediately.\n\nWhy these contracts are legally binding:\n\nThey meet all legal requirements for contracts: offer, acceptance, consideration, and mutual intent. They include digital signatures from both parties. Digital signatures are legally recognized in UK, USA, EU, Australia, and most jurisdictions worldwide. They include permanent timestamps as evidence. They clearly state who owes what to whom. If there's a dispute, you have a signed contract with timestamps as proof.\n\nHow disputes are resolved:\n\nMost disputes are resolved through the platform's built-in resolution process. You don't need to hire a lawyer for most cases. The signed contract is your evidence. RecXchange team can mediate disputes. If mediation fails, you can take the contract to small claims court or hire a lawyer. The contract is legally enforceable in most countries.\n\nImportant note: These contracts are taken very seriously. Both parties are legally obligated to honor the agreement. Breaking a split fee agreement can result in legal action and account suspension."
  },
  {
    category: "Trust & Protection",
    question: "What if my partner doesn't pay their split?",
    answer: "All split fee agreements are legally binding contracts. If there's a payment dispute, you have a signed contract with timestamps as evidence. Most disputes are resolved through the platform's built-in resolution process.",
    detailedAnswer: "Payment disputes are rare on RecXchange. But here's the exact process if it happens:\n\nStep 1 - Contact your partner directly:\n\nSend a message through the platform. Ask about the payment status. Most issues are simple misunderstandings. Common issues: wrong invoice amount sent, payment processing delay (bank transfers take 3-5 days), confusion about who pays whom.\n\nStep 2 - Open a formal dispute in the platform:\n\nIf your partner doesn't respond or refuses to pay, open a dispute. Click 'Report Payment Issue' in your partnership dashboard. Describe the problem clearly. Your partner is notified automatically. They have 7 days to respond with their side of the story.\n\nStep 3 - Provide evidence:\n\nYou upload proof: The signed split fee agreement (already stored in the platform). Email communications between you and your partner. Invoice you sent to your client. Proof of payment received from your client (bank statement or payment screenshot). Any other relevant documents.\n\nStep 4 - Platform mediation:\n\nThe RecXchange team reviews both sides of the dispute. They look at the signed contract. They review the evidence from both parties. They determine who is at fault. This usually takes 7-14 days.\n\nStep 5 - Resolution:\n\nIf the contract clearly states the terms and you can prove the placement was made, you have strong legal standing. If your partner is found at fault: Their account is flagged with a warning. Their rating drops significantly (affects future partnerships). They're required to pay you within 14 days. If they still don't pay, their account is suspended. They cannot make new partnerships until the issue is resolved.\n\nStep 6 - Legal action (rare but available):\n\nYou have a legally binding contract. You can pursue payment through small claims court. Small claims court doesn't require a lawyer in most countries. The cost is low (usually $50-$200 to file). You can hire a lawyer for larger disputes. The signed contract is your primary evidence. Most courts will enforce the contract if it's valid.\n\nHow RecXchange prevents payment disputes:\n\nAll recruiters are rated and reviewed. You can check a recruiter's rating before partnering. Low-rated recruiters (below 3 stars) are flagged. Recruiters with payment issues get negative reviews. You can see reviews that mention 'Paid on time' or 'Payment problems.' Most serious recruiters have 4-5 star ratings and positive reviews.\n\nBest practice to avoid disputes:\n\nOnly partner with recruiters rated 4+ stars. Check their reviews for mentions of payment reliability. Start with smaller roles for first-time partnerships. Build trust over time with repeat partnerships."
  },
  {
    category: "Trust & Protection",
    question: "Are all recruiters vetted?",
    answer: "Yes. All recruiters are rated and reviewed by other members. You can see a recruiter's placement history, rating, and reviews before partnering with them.",
    detailedAnswer: "RecXchange has a comprehensive vetting and rating system to protect all members.\n\nInitial vetting when someone joins:\n\nAll new members must verify their email address. All new members must verify their phone number. Business recruiters must verify their company name and registration number. LinkedIn profiles are encouraged but not required (helps build trust). Payment method must be added to activate full membership.\n\nThe rating system (1-5 stars):\n\nEvery recruiter has a star rating visible on their profile. Ratings are based on multiple factors: Number of successful placements made. Partner reviews after collaborations. Response time to messages (fast responses = higher rating). Completion rate of agreed partnerships. Payment reliability (did they pay their split on time?).\n\nYou can see a recruiter's exact rating before agreeing to partner. Example: 4.8 stars (based on 23 reviews).\n\nThe review system:\n\nAfter each collaboration, both partners can leave a review. Reviews are public and cannot be deleted by the person being reviewed. Reviews are permanent (similar to eBay or Airbnb feedback). You can read what other recruiters say about someone before working with them.\n\nWhat to look for in reviews:\n\nPositive reviews mention: 'Paid on time,' 'Great communication,' 'Very professional,' 'Quick responses,' 'Would work with again.' Negative reviews mention: 'Slow to respond,' 'Payment was late,' 'Poor communication,' 'Unprofessional behavior.'\n\nPlacement history visibility:\n\nYou can see how many placements a recruiter has made. Examples: 0 placements (new recruiter - not necessarily bad, everyone starts somewhere). 3 placements (relatively new but has proven they can close deals). 10+ placements (experienced recruiter with proven track record). 50+ placements (very experienced and reliable).\n\nRed flags to watch for:\n\nRating below 3 stars (indicates serious issues). Multiple negative reviews mentioning payment problems. No placements after 6+ months on the platform (might not be active). Very slow response times (takes days to reply to messages). Incomplete profile (no company information, no LinkedIn, no bio).\n\nBest practice recommendations:\n\nOnly partner with recruiters rated 4+ stars. Prefer recruiters with at least 3 successful placements. Read their reviews carefully before partnering. Start with smaller roles for first-time partnerships. Build trust over time through repeat collaborations. Leave honest reviews after each partnership to help other recruiters."
  },
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = React.useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Generate FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.detailedAnswer || faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16">
            <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
              Frequently Asked Questions
            </span>
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight">
              How RecXchange Works
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about partnering with recruiters and splitting fees.
            </p>
          </motion.header>

          {/* Visual Guide */}
          <section className="mb-16">
            <div className="glass-card p-10 rounded-3xl border-cyan-400/10 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">How Fee Splits Work</h2>
              <p className="text-gray-400 mb-8">Simple visual guide to understanding RecXchange fee sharing</p>
              
              {/* Fee Split Flowchart - Simple Visual */}
              <div className="bg-white/[0.02] rounded-2xl p-8 border border-white/5">
                <div className="space-y-6">
                  {/* Row 1: Total Fee */}
                  <div className="flex items-center justify-center">
                    <div className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold">
                      Total Placement Fee: $7,000
                    </div>
                  </div>
                  
                  {/* Arrow Down */}
                  <div className="flex justify-center">
                    <div className="text-4xl text-gray-600">↓</div>
                  </div>

                  {/* Row 2: Split Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 rounded-xl border border-cyan-400/20 bg-cyan-400/5">
                      <div className="text-cyan-400 font-bold text-lg mb-2">50/50 Split</div>
                      <div className="text-2xl font-bold text-white mb-1">$3,500</div>
                      <div className="text-xs text-gray-500">Each recruiter</div>
                    </div>
                    
                    <div className="p-6 rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/5">
                      <div className="text-fuchsia-400 font-bold text-lg mb-2">60/40 Split</div>
                      <div className="text-2xl font-bold text-white mb-1">$4,200</div>
                      <div className="text-xs text-gray-500">Lead recruiter</div>
                    </div>
                    
                    <div className="p-6 rounded-xl border border-purple-400/20 bg-purple-400/5">
                      <div className="text-purple-400 font-bold text-lg mb-2">70% Direct</div>
                      <div className="text-2xl font-bold text-white mb-1">$4,900</div>
                      <div className="text-xs text-gray-500">RecX Direct</div>
                    </div>
                  </div>

                  {/* Arrow Down */}
                  <div className="flex justify-center">
                    <div className="text-4xl text-gray-600">↓</div>
                  </div>

                  {/* Row 3: Platform Fee */}
                  <div className="flex items-center justify-center">
                    <div className="px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-bold">
                      Platform Fee: $0 (You keep 100%)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                <Link href="https://youtube.com/@recxchange" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-bold text-sm">
                  🎥 Watch Video Tutorials
                </Link>
                <Link href="/why-recxchange" className="px-6 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 transition-all font-bold text-sm">
                  Why Choose RecXchange?
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Categories */}
          {categories.map((category, categoryIndex) => (
            <section key={category} className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {category}
              </h2>
              
              <div className="space-y-6">
                {faqs
                  .filter(faq => faq.category === category)
                  .map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isExpanded = expandedItems.includes(globalIndex);
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 rounded-2xl border-cyan-400/10 hover:border-cyan-400/20 transition-colors"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-3">
                              {faq.question}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                            
                            {faq.detailedAnswer && isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-white/5"
                              >
                                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                                  {faq.detailedAnswer}
                                </p>
                              </motion.div>
                            )}
                          </div>
                          
                          {faq.detailedAnswer && (
                            <button
                              onClick={() => toggleExpand(globalIndex)}
                              className="text-cyan-400 text-sm font-bold hover:text-cyan-300 transition-colors flex-shrink-0"
                            >
                              {isExpanded ? 'Show Less' : 'Show More'}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </section>
          ))}

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-3xl border-cyan-400/10 text-center mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-400 mb-8">
              Talk to our team, watch our tutorials, or start with a free trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-white/10 text-white hover:bg-cyan-400/10 hover:border-cyan-400/30 border border-white/10 font-bold transition-all"
              >
                Contact Us
              </Link>
              <Link
                href="https://youtube.com/@recxchange"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 font-bold transition-all"
              >
                🎥 Watch Tutorials
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
              >
                View Pricing
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
}
