# **File-Share**: File Upload and Download Web Server Setup Instructions

## Prerequisites

- A Raspberry Pi with Raspbian OS installed
- Internet connection
- Basic knowledge of the terminal

## Step-by-Step Setup

### 1. Prepare the Raspberry Pi

1. Open a terminal on your Raspberry Pi.
2. Update the system packages:
   \`\`\`bash
   sudo apt update && sudo apt upgrade -y
   \`\`\`

### 2. Download the Setup Script and Files

1. Create a directory for the project:
   \`\`\`bash
   mkdir project && cd project
   \`\`\`

2. Download the \`setup_web_server.sh\` script:
   \`\`\`bash
   wget https://yourdomain.com/path/to/setup_web_server.sh
   \`\`\`

3. Download the \`server.js\` file:
   \`\`\`bash
   wget https://yourdomain.com/path/to/server.js
   \`\`\`

4. Download the \`index.html\` file:
   \`\`\`bash
   mkdir public
   cd public
   wget https://yourdomain.com/path/to/index.html
   cd ..
   \`\`\`

### 3. Run the Setup Script

1. Make the setup script executable:
   \`\`\`bash
   chmod +x setup_web_server.sh
   \`\`\`

2. Run the setup script:
   \`\`\`bash
   ./setup_web_server.sh
   \`\`\`

### 4. Configure DNS (Optional)

To access the server using a custom domain on your local network, follow these steps:

1. **Set Up Local DNS on Your Router:**
   - Access your router's configuration page (commonly \`192.168.1.1\` or \`192.168.0.1\`).
   - Log in with your credentials.
   - Navigate to the DNS settings section.
   - Add a new host entry for your custom domain (e.g., \`example.local\`) and assign it to the local IP address of your Raspberry Pi (e.g., \`192.168.1.100\`).
   - Save the settings and restart the router if necessary.

2. **Test Local DNS Resolution:**
   - Open a terminal or command prompt on a local device.
   - Test the DNS resolution by pinging the custom domain:
     \`\`\`bash
     ping example.local
     \`\`\`
   - Ensure it resolves to the IP address of your Raspberry Pi.

3. **Access the Web Server:**
   - Open a web browser and navigate to \`http://example.local:3000\`.
   - You should see the file upload and download webpage.

### 5. Enjoy Your File Upload and Download Web Server!

Your setup is complete. You can now upload, download, and delete files on your local network using the custom domain.
