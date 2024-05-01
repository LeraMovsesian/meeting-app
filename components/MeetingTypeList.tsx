'use client';
import Image from 'next/image';
import React, {useState} from "react";
import HomeCard from "@/components/HomeCard";
import {useRouter} from "next/navigation";
import MeetingModal from "@/components/MeetingModal";

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const createMeeting = () => {};

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                className='bg-orange-1'
                img='/icons/add-meeting.svg'
                title='New meeting'
                description='Start an instant meeting'
                handleClick={() => setMeetingState('isJoiningMeeting')}
            />
            <HomeCard
                className='bg-blue-1'
                img='/icons/schedule.svg'
                title='Schedule meeting'
                description='Plan a meeting'
                handleClick={() => setMeetingState('isScheduleMeeting')}
            />
            <HomeCard
                className='bg-yellow-1'
                img='/icons/recordings.svg'
                title='View recordings'
                description='Check out your recordings'
                handleClick={() => router.push('/recordings')}
            />
            <HomeCard
                className='bg-purple-1'
                img='/icons/join-meeting.svg'
                title='Join meeting'
                description='Via invitation link'
                handleClick={() => setMeetingState('isJoiningMeeting')}
            />
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClosr={() => setMeetingState(undefined)}
                title='Start an instant meeting'
                className='text-center'
                buttonText='Start meeting'
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypeList;
