'use client';
import {useGetCalls} from "@/hooks/useGetCalls";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {CallRecording} from "@stream-io/video-client";
import {Call} from "@stream-io/video-react-sdk";
import MeetingCard from "@/components/MeetingCard";

type CallListTypes = 'ended' | 'upcoming' | 'recordings';

const CallList = ({ type }: { type: CallListTypes }) => {
    const router = useRouter();
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings;
            default:
                return [];
        }
    };

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No previous calls'
            case 'upcoming':
                return 'No upcoming calls'
            case 'recordings':
                return 'No recordings'
            default:
                return '';
        }
    };

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard />
            )) : <h1>{noCallsMessage}</h1>}
        </div>
    );
};

export default CallList;
