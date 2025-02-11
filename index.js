// MADE BY SYNTAX

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const keep_alive = require('./keep_alive.js')

function installModules() {
    const requiredModules = [
        'discord.js-selfbot-v13',
        'chalk',
        'figlet',
        'moment'
    ];

    requiredModules.forEach(module => {
        try {
            require.resolve(module);
        } catch (err) {
            console.log(`Installing missing module: ${module}`);
            try {
                execSync(`npm install ${module}`, { stdio: 'inherit' });
            } catch (installError) {
                console.error(`Failed to install ${module}:`, installError);
            }
        }
    });
}


installModules();


const Discord = require('discord.js-selfbot-v13');
const chalk = require('chalk');
const figlet = require('figlet');
const moment = require('moment');


const config = {
    //token: '', // Replace with your token
    status: {
        type: 'dnd',
        emoji: '🌟'
    }
};


const client = new Discord.Client({
    checkUpdate: false,
    autoRedeemNitro: true,
    captchaService: 'capmonster.cloud',
    syncStatus: true
});

// Rich Presence States with Enhanced Configurations
const rpcStates = [
    {
        type: 'STREAMING',
        name: 'Coding Adventures',
        details: '! Kaizen 🥀',
        state: 'Mxybe a Coder?',
        url: 'https://www.twitch.tv/Syntax',
        timestamps: {
            start: Date.now()
        },
        assets: {
            largeImage: 'https://media.discordapp.net/attachments/1277534645633683469/1338796205114654730/49969923d81582ef25c5ac1fedb71e45_1.gif?ex=67ac62a0&is=67ab1120&hm=de4df4f5bde05ed7673826076963cd9e119c8dae19dc068584cb740991ff8b74&=',
            largeText: 'CR7🗿..!?',
            smallImage: 'https://cdn.discordapp.com/emojis/1224756226311852042.gif?size=48',
            smallText: 'Hacker Mode'
        },
        buttons: [
            { label: 'GitHub', url: 'https://github.com/WannaBeGhoSt' },
            { label: 'Support', url: 'https://discord.gg/5yqxjKdyy8' }
        ]
    },
    {
        type: 'WATCHING',
        name: '! Mxbye Arjun 🥀',
        details: '! Mxbye Unrivaled..!? 🥀',
        state: 'Pookiee..!?',
        timestamps: {
            start: Date.now()
        },
        assets: {
            largeImage: 'https://media.discordapp.net/attachments/1277534645633683469/1338795769850757221/6768197852052e3f3fa0106fea104520.gif?ex=67ac6239&is=67ab10b9&hm=db8697fa877295fda46694d032fd87613b16e33bf8cd80b3d6ab093baf698f84&=',
            largeText: 'Nym..!?',
            smallImage: 'https://media.discordapp.net/attachments/1277534645633683469/1338126456705777746/8285d845fbce5ede830d6291fec56b14.gif?ex=67abed20&is=67aa9ba0&hm=6e7f1bb4eb960ef6e127e38ffc850e0f83a87ae6a7b32ac7cd8c8ccfad829cf3&=',
            smallText: 'Damn..!?'
        },
        buttons: [
            { label: 'Ownz..?', url: 'https://discord.gg/simps' },
            { label: 'Bio', url: 'https://guns.lol/kaizenwhoo' }
        ]
    },
    {
        type: 'PLAYING',
        name: 'Type shit.!? 🥀',
        details: 'Luv Is Rage 2 <3',
        state: 'Fxck Love..!?',
        timestamps: {
            start: Date.now()
        },
        assets: {
            largeImage: 'https://media.discordapp.net/attachments/1277534645633683469/1338447551778656296/8ed7c9f0dd685accc8486ed622c5dcd4.gif?ex=67ab1deb&is=67a9cc6b&hm=8d3c14ac0834e260fd23fc87eec698e563ff28d56b592b71b660c4d5ed152a41&=',
            largeText: 'Smokeee...',
            smallImage: 'https://cdn.discordapp.com/emojis/1312633052668629055.gif?size=48',
            smallText: 'Be aware'
        },
        buttons: [
            { label: 'H O M E T O W N', url: 'https://discord.gg/simps' },
            { label: 'Bio', url: 'https://guns.lol/kaizenwhoo' }
        ]
    }
];


function log(message, type = 'info') {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const colors = {
        info: chalk.blueBright,
        success: chalk.greenBright,
        error: chalk.redBright,
        warning: chalk.yellowBright
    };

    const logTypes = {
        info: '📌 INFO',
        success: '✅ SUCCESS',
        error: '❌ ERROR',
        warning: '⚠️ WARNING'
    };

    console.log(
        colors[type](
            `[${logTypes[type]}] ${timestamp} → ${message}`
        )
    );
}


function rotateRichPresence() {
    let currentIndex = 0;

    const updatePresence = () => {
        const currentState = rpcStates[currentIndex];
        
        try {
           
            const activity = new Discord.RichPresence(client)
                .setType(currentState.type)
                .setName(currentState.name)
                .setDetails(currentState.details)
                .setState(currentState.state);

           
            if (currentState.type === 'STREAMING' && currentState.url) {
                activity.setURL(currentState.url);
            }

            
            if (currentState.timestamps) {
                activity.setStartTimestamp(currentState.timestamps.start);
            }

            
            if (currentState.assets) {
                activity
                    .setAssetsLargeImage(currentState.assets.largeImage)
                    .setAssetsLargeText(currentState.assets.largeText)
                    .setAssetsSmallImage(currentState.assets.smallImage)
                    .setAssetsSmallText(currentState.assets.smallText);
            }

            
            if (currentState.buttons) {
                currentState.buttons.forEach(btn => 
                    activity.addButton(btn.label, btn.url)
                );
            }

            
            client.user.setActivity(activity);

            
            log(`Switched to ${currentState.name} RPC`, 'info');
        } catch (error) {
            log(`RPC Update Error: ${error.message}`, 'error');
        }

        
        currentIndex = (currentIndex + 1) % rpcStates.length;
    };

    
    updatePresence();

    // Rotate Every 45 Seconds
    setInterval(updatePresence, 45000);
}

client.on('ready', async () => {
    console.clear();
    
    
    console.log(
        chalk.magentaBright(
            figlet.textSync('Syntax RPC', { 
                font: 'Slant', 
                horizontalLayout: 'default', 
                verticalLayout: 'default' 
            })
        )
    );

    
    log(`Successfully Authenticated`, 'success');
    log(`Logged in as ${client.user.tag}`, 'info');
    log(`User ID: ${client.user.id}`, 'info');
    
    
    client.user.setStatus(config.status.type);
    
    
    rotateRichPresence();
});


client.on('error', (error) => {
    log(`Client Connection Error: ${error.message}`, 'error');
});

process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled System Rejection: ${reason}`, 'warning');
});


process.on('SIGINT', () => {
    log('Selfbot shutting down gracefully', 'warning');
    client.destroy();
    process.exit(0);
});


client.login(process.env.TOKEN);
