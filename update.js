const fs = require('fs');

let text = fs.readFileSync('index.html', 'utf-8');

const content = text.split("<!-- Project Card ");

let newContent = [content[0]];

for (let i = 1; i < content.length; i++) {
    let section = content[i];
    
    if (['1', '3', '4', '5', '6', '7'].some(x => section.startsWith(x))) {
        let idx = section[0];
        
        // Modify opening div
        section = section.replace(
            /<div class="fade-in-up card p-6 project-card" data-category="([^"]+)">/,
            `<div class="fade-in-up card p-6 project-card cursor-pointer hover:border-claude-blue/50 transition-all duration-300 transform hover:-translate-y-1 group" data-category="$1" onclick="openProjectDetailModal('project-${idx}')">`
        );
        
        // Modify image hover
        section = section.replace(
            /<img src="([^"]+)" alt="Project Image" class="w-full h-full object-cover rounded-lg"( loading="lazy")?>/,
            `<img src="$1" alt="Project Image" class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"$2>`
        );
        
        // Modify bottom button
        const bottomReplacement = `<div class="flex gap-3 mt-auto">
                        <button class="text-claude-blue hover:text-white font-semibold flex items-center gap-2 transition-colors w-full justify-center border border-claude-blue/30 rounded-lg py-2 hover:bg-claude-blue hover:border-claude-blue">
                            VIEW DETAILS <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>
                </div>`;
                
        section = section.replace(
            /<div class="flex gap-3">[\s\S]*?<\/div>[\s\S]*?<\/div>\s*$/,
            bottomReplacement + '\n'
        );
        
        newContent.push("<!-- Project Card " + section);
        
    } else if (section.startsWith("2")) {
        section = section.replace('onclick="openProjectDetailModal()"', 'onclick="openProjectDetailModal(\'project-2\')"');
        newContent.push("<!-- Project Card " + section);
    } else {
        newContent.push("<!-- Project Card " + section);
    }
}

text = newContent.join("");

const modalOld = `    <!-- Project Details Modal -->
    <div id="projectDetailModal" class="fixed inset-0 bg-black bg-opacity-80 hidden z-[60] flex items-center justify-center p-4 backdrop-blur-sm opacity-0 transition-opacity duration-300">
        <div class="bg-claude-dark-bg rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-[0_0_40px_rgba(37,99,235,0.2)] border border-claude-blue/30 transform scale-95 transition-transform duration-300" id="projectDetailModalContent">
            <!-- Header -->
            <div class="flex justify-between items-start p-6 border-b border-claude-blue/20">
                <h3 id="detailModalTitle" class="text-2xl font-futuristic font-bold text-claude-blue pr-8">
                    Smart Lead Capture & CRM Automation System
                </h3>
                <button id="closeDetailModal" class="text-claude-muted-tan hover:text-white text-2xl transition-colors absolute top-6 right-6">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <!-- Body -->
            <div class="p-6 overflow-y-auto custom-scrollbar">
                <!-- Description -->
                <div class="mb-8 text-claude-muted-tan text-lg leading-relaxed">
                    This automation system captures booking inquiries from a website form, validates the information, checks for existing records, updates or creates CRM entries, and sends both client confirmation and internal notifications automatically.
                </div>
                
                <!-- Technologies -->
                <div class="mb-8">
                    <h4 class="text-white font-semibold mb-4 text-lg">Technologies Used</h4>
                    <div class="flex flex-wrap gap-4">
                        <div class="flex items-center gap-2 bg-claude-darker-bg px-4 py-2 rounded-lg border border-border-color shadow-sm">
                            <img src="https://cdn.simpleicons.org/airtable/white" class="w-5 h-5 pointer-events-none" alt="Airtable"> <span class="text-claude-muted-tan font-medium">Airtable</span>
                        </div>
                        <div class="flex items-center gap-2 bg-claude-darker-bg px-4 py-2 rounded-lg border border-border-color shadow-sm">
                            <img src="https://cdn.simpleicons.org/googlesheets/white" class="w-5 h-5 pointer-events-none" alt="Google Sheets"> <span class="text-claude-muted-tan font-medium">Google Sheets</span>
                        </div>
                        <div class="flex items-center gap-2 bg-claude-darker-bg px-4 py-2 rounded-lg border border-border-color shadow-sm">
                            <img src="https://cdn.simpleicons.org/gmail/white" class="w-5 h-5 pointer-events-none" alt="Gmail"> <span class="text-claude-muted-tan font-medium">Gmail</span>
                        </div>
                        <div class="flex items-center gap-2 bg-claude-darker-bg px-4 py-2 rounded-lg border border-border-color shadow-sm">
                            <img src="./assets/images/slack-logo.webp" class="w-5 h-5 pointer-events-none object-contain" alt="Slack" onerror="this.src='https://cdn.simpleicons.org/slack/white'"> <span class="text-claude-muted-tan font-medium">Slack</span>
                        </div>
                        <div class="flex items-center gap-2 bg-claude-darker-bg px-4 py-2 rounded-lg border border-border-color shadow-sm">
                            <i class="fas fa-webhook text-white w-5 text-center text-lg"></i> <span class="text-claude-muted-tan font-medium">Webhook</span>
                        </div>
                        <div class="flex items-center gap-2 bg-claude-darker-bg px-4 py-2 rounded-lg border border-border-color shadow-sm">
                            <img src="https://cdn.simpleicons.org/make/white" class="w-5 h-5 pointer-events-none" alt="Make.com"> <span class="text-claude-muted-tan font-medium">Make.com</span>
                        </div>
                    </div>
                </div>
                
                <!-- Business Impact Highlight -->
                <div class="bg-gradient-to-br from-blue-900/30 to-claude-dark-bg border border-claude-blue/40 rounded-xl p-6 mb-8 relative overflow-hidden group hover:border-claude-blue/60 transition-colors">
                    <div class="absolute right-0 top-0 opacity-5 text-9xl text-claude-blue transform translate-x-4 -translate-y-8 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h4 class="text-claude-blue font-futuristic font-bold text-xl mb-4 flex items-center gap-2">
                        <i class="fas fa-bolt text-yellow-500"></i> Estimated Savings & Impact
                    </h4>
                    <ul class="space-y-3 relative z-10">
                        <li class="flex items-start gap-3 text-white">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <span class="font-medium text-[1.05rem]">Saves 10–15 hours per week in manual lead processing</span>
                        </li>
                        <li class="flex items-start gap-3 text-claude-muted-tan">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <span>Reduces missed inquiries</span>
                        </li>
                        <li class="flex items-start gap-3 text-claude-muted-tan">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <span>Improves response time for clients</span>
                        </li>
                        <li class="flex items-start gap-3 text-claude-muted-tan">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <span>Fully automated CRM updates, eliminating manual errors</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Action Button -->
                <div class="text-center mt-2">
                    <button class="inline-flex items-center gap-2 px-8 py-3.5 w-full sm:w-auto justify-center rounded-lg bg-claude-blue hover:bg-blue-600 text-white font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]" onclick="openLoomModal('Lead Capture → CRM & Email Alerts', 'YOUR_LOOM_URL_HERE'); document.getElementById('closeDetailModal').click();">
                        <i class="fas fa-project-diagram"></i> View Automation Workflow
                    </button>
                </div>
            </div>
        </div>
    </div>`;

const modalNew = `    <!-- Project Details Modal -->
    <div id="projectDetailModal" class="fixed inset-0 bg-black bg-opacity-80 hidden z-[60] flex items-center justify-center p-4 backdrop-blur-sm opacity-0 transition-opacity duration-300">
        <div class="bg-claude-dark-bg rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-[0_0_40px_rgba(37,99,235,0.2)] border border-claude-blue/30 transform scale-95 transition-transform duration-300" id="projectDetailModalContent">
            <!-- Header -->
            <div class="flex justify-between items-start p-6 border-b border-claude-blue/20">
                <h3 id="detailModalTitle" class="text-2xl font-futuristic font-bold text-claude-blue pr-8">
                    Title
                </h3>
                <button id="closeDetailModal" class="text-claude-muted-tan hover:text-white text-2xl transition-colors absolute top-6 right-6">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <!-- Body -->
            <div class="p-6 overflow-y-auto custom-scrollbar">
                <!-- Description -->
                <div id="detailModalDesc" class="mb-8 text-claude-muted-tan text-lg leading-relaxed">
                    Description
                </div>
                
                <!-- Technologies -->
                <div class="mb-8">
                    <h4 class="text-white font-semibold mb-4 text-lg">Technologies Used</h4>
                    <div id="detailModalTech" class="flex flex-wrap gap-4">
                    </div>
                </div>
                
                <!-- Business Impact Highlight -->
                <div class="bg-gradient-to-br from-blue-900/30 to-claude-dark-bg border border-claude-blue/40 rounded-xl p-6 mb-8 relative overflow-hidden group hover:border-claude-blue/60 transition-colors">
                    <div class="absolute right-0 top-0 opacity-5 text-9xl text-claude-blue transform translate-x-4 -translate-y-8 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h4 id="detailModalImpactTitle" class="text-claude-blue font-futuristic font-bold text-xl mb-4 flex items-center gap-2">
                        <i class="fas fa-bolt text-yellow-500"></i> Estimated Savings & Impact
                    </h4>
                    <ul id="detailModalImpact" class="space-y-3 relative z-10">
                    </ul>
                </div>
                
                <!-- Action Button -->
                <div class="text-center mt-2" id="detailModalActionContainer">
                    <button id="detailModalActionBtn" class="inline-flex items-center gap-2 px-8 py-3.5 w-full sm:w-auto justify-center rounded-lg bg-claude-blue hover:bg-blue-600 text-white font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                        <i class="fas fa-project-diagram"></i> View Automation Workflow
                    </button>
                </div>
            </div>
        </div>
    </div>`;

text = text.replace(modalOld, modalNew);

fs.writeFileSync('index.html', text);
console.log('Update HTML complete!');
