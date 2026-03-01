'use client'

import { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { Button } from '@/components/ui/button'
import BookWebinarContent from './BookWebinarContent'
import { useIsMobile } from '@/hooks/useIsMobile'
import './book-webinar.css'

interface Props {
    source: string
}

export default function BookWebinarModal({ source }: Props) {
    const [open, setOpen] = useState(false)
    
    const isMobile = useIsMobile(1023)

    const showModal = () => {
        setOpen(true)
    }
    const handleCancel = () => setOpen(false)

    return (
        <>
            {/* Button visible in Navbar */}
            {source === "hero" ?
                <Button
                    className={`relative text-white rounded-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold border-2 border-white/30 transition-all duration-300 w-full sm:w-auto ${isMobile ? 'bg-white/15' : 'bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/50 hover:shadow-2xl hover:shadow-white/20'}`}
                    data-cursor-hover
                    onClick={() => showModal()}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <span>Book Webinar</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </span>
                    </Button> 
                :
                <Button
                    onClick={() => showModal()}
                    className={
                        source === 'sticky-bar'
                        ? 'ml-4 flashy-gradient-btn py-2 px-5'
                        : isMobile
                        ? 'w-full rounded-full bg-white/20 border border-white/30 text-white font-semibold py-2 px-5 shadow-md transition'
                        : 'hidden md:inline-flex rounded-full bg-white/20 border border-white/30 text-white font-semibold py-2 px-5 shadow-md transition'
                    }
                >
                    Book Webinar
                </Button>
            }
            
            <Modal
                open={open}
                onCancel={handleCancel}
                footer={null}
                width={1100}
                centered
                destroyOnHidden
                className='webinar-modal'
                
            >
                <BookWebinarContent />
            </Modal>
        </>
    )
}