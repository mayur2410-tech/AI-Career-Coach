import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import AiTools from './_components/AiTools'
import History from './_components/History'

function Dashboard() {
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6 lg:p-8'>
            <div className='max-w-7xl mx-auto space-y-6'>
                <WelcomeBanner />
                <AiTools />
                <History />
            </div>
        </div>
    )
}

export default Dashboard