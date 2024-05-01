'use client';
import React, {useState} from "react";
import HomeCard from "@/components/HomeCard";
import {useRouter} from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import {useUser} from "@clerk/nextjs";
import {Call, useStreamVideoClient} from "@stream-io/video-react-sdk";

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        link: '',
        description: '',
    });
    const [callDetails, setCallDetails] = useState<Call>();

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create a call');

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting';
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                }
            });
            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                className='bg-orange-1'
                img='/icons/add-meeting.svg'
                title='New meeting'
                description='Start an instant meeting'
                handleClick={() => setMeetingState('isInstantMeeting')}
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
                onClose={() => setMeetingState(undefined)}
                title='Start an instant meeting'
                className='text-center'
                buttonText='Start meeting'
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypeList;
