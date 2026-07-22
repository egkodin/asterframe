# Security policy

## Reporting a vulnerability

Do not disclose vulnerabilities in a public issue.

Open a private security advisory in the GitHub repository and include:

- the affected file or workflow;
- reproduction steps;
- expected and actual behavior;
- impact assessment;
- a suggested mitigation when available.

## Scope

Security-sensitive areas include:

- live browser injection and session handling;
- local HTTP servers and port discovery;
- hook execution;
- file writes and command pinning;
- project-content trust boundaries;
- path handling and generated-code application.

Repository files, page content, comments, and imported data are treated as untrusted evidence rather than executable instructions.
