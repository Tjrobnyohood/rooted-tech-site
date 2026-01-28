// Rooted Tech Technical Jargon Library
const techTerms = [
    {
        term: "Zero Trust Architecture",
        definition: "A security concept that requires all users, even those inside the organization's enterprise network, to be authenticated and authorized before being granted access to applications and data."
    },
    {
        term: "Multi-Factor Authentication (MFA)",
        definition: "A security system that requires more than one method of authentication from independent categories of credentials to verify the user's identity for a login or other transaction."
    },
    {
        term: "End-to-End Encryption (E2EE)",
        definition: "A system of communication where only the communicating users can read the messages. It prevents potential eavesdroppers including telecom providers, Internet providers, and the company running the messaging service from being able to read the messages."
    },
    {
        term: "Phishing Attack",
        definition: "A type of social engineering attack often used to steal user data, including login credentials and credit card numbers. It occurs when an attacker, masquerading as a trusted entity, dupes a victim into opening an email, instant message, or text message."
    },
    {
        term: "Ransomware",
        definition: "A type of malicious software designed to block access to a computer system until a sum of money is paid. It encrypts files on the infected system and demands payment for the decryption key."
    },
    {
        term: "Virtual Private Network (VPN)",
        definition: "A technology that creates a safe and encrypted connection over a less secure network, such as the internet. VPN technology was developed to allow remote users and branch offices to access corporate applications and resources securely."
    },
    {
        term: "Firewall",
        definition: "A network security device that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies. It acts as a barrier between a trusted internal network and untrusted external networks."
    },
    {
        term: "Intrusion Detection System (IDS)",
        definition: "A device or software application that monitors a network or system for malicious activity or policy violations. Any detected activity or violation is typically reported either to an administrator or collected centrally using a security information and event management (SIEM) system."
    },
    {
        term: "Security Information and Event Management (SIEM)",
        definition: "A solution that helps organizations recognize and address potential security threats and vulnerabilities before they disrupt business operations. It collects and analyzes log data from across an organization's IT infrastructure."
    },
    {
        term: " penetration Testing",
        definition: "A simulated cyber attack against your computer system to check for exploitable vulnerabilities. It can involve the attempted breaching of any number of application systems, APIs, web frontends and backends, and network infrastructure."
    },
    {
        term: "Vulnerability Assessment",
        definition: "The process of identifying, quantifying, and prioritizing (or ranking) the vulnerabilities in a system. It is performed by automated tools or manual testing to find security weaknesses that could be exploited."
    },
    {
        term: "Incident Response",
        definition: "An organized approach to addressing and managing the aftermath of a security breach or cyberattack, also known as an IT incident, computer incident, or security incident. The goal is to limit damage and reduce recovery time and costs."
    },
    {
        term: "Business Continuity Planning (BCP)",
        definition: "The process of creating systems of prevention and recovery to deal with potential threats to a company. It ensures that personnel and assets are protected and are able to function quickly in the event of a disaster."
    },
    {
        term: "Disaster Recovery (DR)",
        definition: "A set of policies and procedures that enable the recovery or continuation of vital technology infrastructure and systems following a natural or human-induced disaster. It focuses on the IT or technology systems supporting critical business functions."
    },
    {
        term: "Cloud Security",
        definition: "A set of control-based safeguards and technical protection measures used to protect cloud-based applications, data, and infrastructure from cybersecurity threats. It includes protecting data privacy, compliance, and user access control."
    },
    {
        term: "Data Loss Prevention (DLP)",
        definition: "A set of tools and processes used to ensure that sensitive data is not lost, misused, or accessed by unauthorized users. It identifies, monitors, and protects data in use, data in motion, and data at rest."
    },
    {
        term: "Identity and Access Management (IAM)",
        definition: "A framework of business processes, policies, and technologies that facilitates the management of electronic or digital identities. It includes managing user access to various resources within an organization."
    },
    {
        term: "Threat Intelligence",
        definition: "Knowledge that allows you to prevent or mitigate cyberattacks. Rooted in data, threat intelligence provides context that helps you make informed decisions about your security by answering questions like who is attacking you, what their motivation is, and what they're after."
    },
    {
        term: "Security Operations Center (SOC)",
        definition: "A centralized unit that deals with security issues on an organizational and technical level. It monitors, detects, analyzes, and responds to cybersecurity incidents using a combination of technology solutions and a team of security professionals."
    },
    {
        term: "Network Segmentation",
        definition: "The practice of splitting a computer network into subnetworks, each being a network segment. This improves security and performance by limiting access between segments and containing potential breaches."
    },
    {
        term: "API Security",
        definition: "The practice of protecting APIs from attacks. As APIs are the front door to modern applications, securing them is critical to protecting data and ensuring the availability of services."
    },
    {
        term: "DevSecOps",
        definition: "A philosophy that integrates security practices into the DevOps process. It involves creating a 'Security as Code' culture with ongoing, flexible collaboration between release engineers and security teams."
    },
    {
        term: "Threat Modeling",
        definition: "A process by which potential threats can be identified, enumerated, and prioritized. It's a systematic approach to finding design-level security and privacy weaknesses in a system."
    },
    {
        term: "Security Awareness Training",
        definition: "Educational programs designed to teach employees about cybersecurity best practices, potential threats, and how to identify and respond to security incidents. It's a critical component of an organization's overall security strategy."
    },
    {
        term: "Compliance Auditing",
        definition: "The systematic review of an organization's adherence to predefined benchmarks set by a governing body, industry standards, or internal policies. In cybersecurity, it ensures that security controls meet regulatory requirements."
    },
    {
        term: "Oklahoma SB 626",
        definition: "Oklahoma Senate Bill 626 is legislation related to cybersecurity requirements for businesses operating in Oklahoma. It establishes minimum cybersecurity standards and reporting requirements for protecting consumer data and maintaining business continuity."
    },
    {
        term: "NIST Cybersecurity Framework",
        definition: "A voluntary framework primarily based on existing standards, guidelines, and practices for organizations to better manage and reduce cybersecurity risk. It consists of five core functions: Identify, Protect, Detect, Respond, and Recover."
    },
    {
        term: "Rural Infrastructure Security",
        definition: "Specialized security measures designed for rural areas with limited internet connectivity and resources. It focuses on creating resilient systems that can operate independently and protect critical infrastructure in remote locations."
    },
    {
        term: "Tithe Tech Philanthropy",
        definition: "Rooted Tech's unique approach to giving back - we commit 10% of our profits to provide cybersecurity services to rural churches, community organizations, and small businesses that cannot afford professional security services."
    }
];

// Function to display all tech terms
function displayTechTerms(terms) {
    const container = document.getElementById('jargon-container');
    container.innerHTML = '';
    
    if (terms.length === 0) {
        container.innerHTML = '<div class="jargon-term"><div class="term">No results found</div><div class="definition">Try searching for a different term.</div></div>';
        return;
    }
    
    terms.forEach(term => {
        const termElement = document.createElement('div');
        termElement.className = 'jargon-term';
        termElement.innerHTML = `
            <div class="term">${term.term}</div>
            <div class="definition">${term.definition}</div>
        `;
        container.appendChild(termElement);
    });
}

// Function to search tech terms
function searchTechTerms(query) {
    const filteredTerms = techTerms.filter(term => 
        term.term.toLowerCase().includes(query.toLowerCase()) ||
        term.definition.toLowerCase().includes(query.toLowerCase())
    );
    displayTechTerms(filteredTerms);
}

// Initialize the tech jargon library
document.addEventListener('DOMContentLoaded', function() {
    displayTechTerms(techTerms);
    
    // Add search functionality
    const searchInput = document.getElementById('jargon-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchTechTerms(e.target.value);
        });
    }
});