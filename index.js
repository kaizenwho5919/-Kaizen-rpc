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
            largeImage: 'https://media.discordapp.net/attachments/1277534645633683469/1338796205114654730/49969923d81582ef25c5ac1fedb71e45_1.gif?ex=67c617e0&is=67c4c660&hm=413edb6ce8b8cfc65015d15ffe2755f074128f06934863128737cd6e593ef6db&=',
            largeText: 'CR7🗿..!?',
            smallImage: 'https://media.discordapp.net/attachments/1277534645633683469/1338126456705777746/8285d845fbce5ede830d6291fec56b14.gif?ex=67c64b20&is=67c4f9a0&hm=f7eb7817c2d6e86b0de7105b14bc05d4033b88f58f141ab7a44032fd69959068&=',
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
        details: '! Unrivaled..!? 🥀',
        state: 'Typee shii..!?',
        timestamps: {
            start: Date.now()
        },
        assets: {
            largeImage: 'https://media.discordapp.net/attachments/1277534645633683469/1338451307119509554/5a309a4848e5724164982a83a7ed3ad7.gif?ex=67c6282a&is=67c4d6aa&hm=8c17b2293da874738ac074d4d642d363180a7fddecd797ecb993e047f62d5d17&=&width=325&height=350',
            largeText: 'Money..!?',
            smallImage: 'https://media.discordapp.net/attachments/1277534645633683469/1338795355659046922/4eb056dae9372fb0907723a060fd3f84.gif?ex=67c61716&is=67c4c596&hm=79cc472e880032b0cc6400b69f8415a8ca3c1219bf2eace3954cd6c522275fce&=',
            smallText: 'Damn..!?'
        },
        buttons: [
            { label: 'Ownz..?', url: 'https://discord.gg/simps' },
            { label: 'Bio', url: 'https://guns.lol/kaizenwhoo' }
        ]
    },
    {
        type: 'PLAYING',
        name: 'Supii<3 🥀',
        details: 'Kaizen Loves Supriya 💖<3',
        state: 'Only her 🥰..!?',
        timestamps: {
            start: Date.now()
        },
        assets: {
            largeImage: 'https://media.discordapp.net/attachments/1277534645633683469/1338920892809347163/20220827_072402.gif?ex=67c68c00&is=67c53a80&hm=6d26966f42a479503421f49b9574dc073a39dd59a40388bf1224a17467611bd8&=',
            largeText: 'Hihi...',
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
