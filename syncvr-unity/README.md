# SyncVR Unity Project

The SyncVR Unity project facilitates **real-time motor synchronization** between participants in a virtual reality (VR) environment. By tracking participants' movements, SyncVR calculates synchronization levels and provides visual feedback, all while allowing researchers to study the effects of this remote synchronization on social connections and empathy.

## Core Components

- **Real-Time Synchronization**: The system calculates and tracks synchronization between participants' movements in real-time, offering visual feedback (e.g., room lighting) to show how well participants' movements are in sync.
  
- **Relay Integration (P2P)**: SyncVR uses **Unity Relay**, a peer-to-peer (P2P) solution, to establish low-latency communication between participants. Relay ensures seamless interaction and accurate synchronization measurements. Learn more about Relay here: [Relay Documentation](https://docs.unity.com/relay).

- **Oculus Quest 2 Devices**: The system uses **Oculus Quest 2** for motion tracking, which captures participants' hand and body movements. These devices allow for fully immersive and accurate remote interaction.

- **Synchronization Experiences**:
    - **Spontaneous Hands Synchronization**: Participants raise and lower their hands while the system tracks their synchronization levels in real-time.
    - **Pendulum Synchronization**: Participants avoid a swinging pendulum by bending in unison, with synchronization feedback provided through visual cues.

- **Data Collection and Feedback**: Throughout the session, SyncVR collects movement data and provides participants with immediate feedback based on synchronization levels. After the session, participants complete a questionnaire within the VR environment, assessing their feelings of empathy, closeness, and willingness to help.

## Research-Oriented Focus

SyncVR is designed as a research tool, enabling researchers to study **Remote Interpersonal Motor Synchronization (rIMS)** and its effects on social connections in a controlled VR environment. Researchers can customize the VR experiences, schedule sessions, and analyze data to better understand how synchronized movement in VR influences social bonding.

*Note: SyncVR uses [Ready Player Me](https://docs.readyplayer.me/) avatars to represent participants in the VR environment.*
