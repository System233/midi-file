declare module 'midi-file' {
    enum MidiFormat{
        Single=0,
        Multiple=1,
        Pattern=2
    }
    interface MidiHeader {
        format: MidiFormat;
        numTracks: number;
        ticksPerBeat: number;
    }

    interface MidiBaseEvent<T>{
        deltaTime: number;
        type:T;
    }
    interface MidiMetaEvent<T> extends MidiBaseEvent<T>{
        meta:true;
    }
    interface MidiSmpteOffsetMixins{
        frameRate:24|25|26|29|30;
        hour:number;
        min:number;
        sec:number;
        frame:number;
        subFrame:number;
    }
    interface MidiTimeSignatureMixins{
        numerator:number;
        denominator:number;
        metronome:number;
        thirtyseconds:number;
    }
    interface MidiKeySignatureMixins{
        key:number;
        scale:number;
    }
    interface MidiSequencerSpecificMixins{
        data:Buffer;
    }
    interface MidiUnknownMixins{
        data:Buffer;
        metatypeByte:number;
    }
    interface MidiNumberMixins{number:number};
    interface MidiTextMixins{text:string};
    type MidiSequenceNumberEvent=MidiMetaEvent<"sequenceNumber">&MidiNumberMixins;
    type MidiTextEvent=MidiMetaEvent<"text">&MidiTextMixins;
    type MidiCopyrightNoticeEvent=MidiMetaEvent<"copyrightNotice">&MidiTextMixins;
    type MidiTrackNameEvent=MidiMetaEvent<"trackName">&MidiTextMixins;
    type MidiInstrumentNameEvent=MidiMetaEvent<"instrumentName">&MidiTextMixins;
    type MidiLyricsEvent=MidiMetaEvent<"lyrics">&MidiTextMixins;
    type MidiMarkerEvent=MidiMetaEvent<"marker">&MidiTextMixins;
    type MidiCuePointEvent=MidiMetaEvent<"cuePoint">&MidiTextMixins;
    type MidiChannelEvent=MidiMetaEvent<"channelPrefix">&{channel:number};
    type MidiPortEvent=MidiMetaEvent<"portPrefix">&{port:number};
    type MidiEndOfTrackEvent=MidiMetaEvent<"endOfTrack">;
    type MidiSetTempoEvent=MidiMetaEvent<"setTempo">&{microsecondsPerBeat:number};
    type MidiSmpteOffsetEvent=MidiMetaEvent<"smpteOffset">&MidiSmpteOffsetMixins;
    type MidiTimeSignatureEvent=MidiMetaEvent<"timeSignature">&MidiTimeSignatureMixins;
    type MidiKeySignatureEvent=MidiMetaEvent<"keySignature">&MidiKeySignatureMixins;
    type MidiSequencerSpecificEvent=MidiMetaEvent<"sequencerSpecific">&MidiSequencerSpecificMixins;
    type MidiUnknownEvent=MidiMetaEvent<"unknownMeta">&MidiUnknownMixins;

    type MidiSysExEvent=MidiBaseEvent<"sysEx">&{data:Buffer};
    type MidiEndSysExEvent=MidiBaseEvent<"endSysEx">&{data:Buffer};

    interface MidiNoteMixins{
        noteNumber:number;
        velocity:number;
        byte9?:true
    }
    interface MidiNoteAftertouchMixins{
        noteNumber:number;
        amount:number;
    }
    interface MidiControllerMixins{
        noteNumber:number;
        amount:number;
    }
    type MidiNoteOnEvent=MidiBaseEvent<"noteOn">&MidiNoteMixins;
    type MidiNoteOffEvent=MidiBaseEvent<"noteOff">&MidiNoteMixins;
    type MidiNoteAftertouchEvent=MidiBaseEvent<"noteAftertouch">&MidiNoteAftertouchMixins;
    type MidiControllerEvent=MidiBaseEvent<"controller">&MidiControllerMixins;
    type MidiProgramChangeEvent=MidiBaseEvent<"programChange">&{programNumber:number};
    type MidiChannelAftertouchEvent=MidiBaseEvent<"channelAftertouch">&{amount:number};
    type MidiPitchBendEvent=MidiBaseEvent<"pitchBend">&{value:number};
    
    type MidiEvent=MidiSequenceNumberEvent| MidiTextEvent|
                    MidiCopyrightNoticeEvent| MidiTrackNameEvent| 
                    MidiInstrumentNameEvent| MidiLyricsEvent| 
                    MidiMarkerEvent| MidiCuePointEvent|
                    MidiChannelEvent| MidiPortEvent| 
                    MidiEndOfTrackEvent| MidiSetTempoEvent| 
                    MidiSmpteOffsetEvent| MidiTimeSignatureEvent| 
                    MidiKeySignatureEvent| MidiSequencerSpecificEvent| 
                    MidiUnknownEvent| MidiSysExEvent| MidiEndSysExEvent| 
                    MidiControllerEvent| MidiProgramChangeEvent|
                    MidiChannelAftertouchEvent| MidiPitchBendEvent|
                    MidiNoteAftertouchEvent|MidiNoteOnEvent| MidiNoteOffEvent;
    interface MidiData {
        header: MidiHeader;
        tracks: Array<Array<MidiEvent>>;
    }

    function parseMidi(data: Buffer|Uint8Array): MidiData;
    function writeMidi(data: MidiData): Array<any>;
}
