'use client';
import React, { useContext, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { ActionIcon, Card, Flex, Input, Select, Table, Button, Title, Loader, ScrollArea } from '@mantine/core';
import { IconPencil, IconSearch, IconTrash } from '@tabler/icons-react';
import { StoreContext } from '@/store/context';
import { Participant } from '@/types';
import { useDisclosure } from '@mantine/hooks';
import { NewParticipant } from './NewParticipant';
import { SearchBar } from '../Atoms/SearchBar';
import { Column } from '../Layout/Column';
import { formatDate } from '@/lib/utils';


enum SortingOption {
    Name = 'Name',
    Email = 'Email',
    Sex = 'Sex',
    LastExperience = 'Last Experience',
}

// Table displaying all participants registered on the platform
export function ParticipantsTable() {
    const [{ participantsLoading }, setStore] = useContext(StoreContext);
    const [opened, { open, close, toggle }] = useDisclosure(false);
    const [editParticipant, setEditParticipant] = useState<Participant | undefined>();
    const [{ participants }] = useContext(StoreContext);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [sortCriteria, setSortCriteria] = useState<string>('Name');

    // While waiting for fetch of participants, display loading message
    if (!participants) return <div>Loading...</div>;


    // Create a new participant or update an existing one on button click
    const handleCreateParticipant = async (participant: Participant) => {
        const newParticipant = {
            ...participant,
            lastExperience: editParticipant ? editParticipant.lastExperience : '-',
        };

        try {
            let response;
            setLoading(true);
            if (editParticipant) {
                response = await axios.put('/api/participants/update', newParticipant);
            } else {
                response = await axios.post('/api/participants/create', newParticipant);
            }

            setStore((prev) => {
                if (editParticipant) {
                    return {
                        ...prev,
                        participants: prev.participants.map((p) => (p.email === newParticipant.email ? newParticipant : p)),
                    };
                } else {
                    return {
                        ...prev,
                        participants: [...prev.participants, newParticipant],
                    };
                }
            });

            console.log('Store after add/update:', response.data);

            close();
            setEditParticipant(undefined);
        } catch (error) {
            console.error('Error creating/updating participant:', error);
        }
        setLoading(false);
    };

    // Open the modal to edit a participant
    const handleEditClick = (participant: Participant) => {
        setEditParticipant(participant);
        open();
    };

    // Delete a participant by its email
    const handleDeleteClick = async (email: string) => {
        try {
            const response = await axios.delete('/api/participants/delete', {
                data: { email },
            });

            setStore((prev) => ({
                ...prev,
                participants: prev.participants.filter((participant) => participant.email !== email),
            }));

            console.log('Delete result:', response.data);
        } catch (error) {
            console.error('Error deleting participant:', error);
        }
    };

    // Change the sorting criteria (name, email, last experience, sex)
    const handleChangeSortingFunction = (value: string | null) => {
        if (value) setSortCriteria(value);
    };


    // Sorting function based on selected criteria
    const sortParticipants = (a: Participant, b: Participant): number => {
        switch (sortCriteria) {
            case SortingOption.Name:
                return a.name?.localeCompare(b.name);
            case SortingOption.Email:
                return a.email?.localeCompare(b.email);
            case SortingOption.LastExperience:
                return a.lastExperience?.localeCompare(b.lastExperience);
            case SortingOption.Sex:
                return a.sex?.localeCompare(b.sex);
            default:
                return 0;
        }
    };


    // Filter participants based on search input
    const filteredParticipants = participants
        .filter((participant) => {
            return (
                participant.name.toLowerCase().includes(search.toLowerCase()) ||
                participant.email.toLowerCase().includes(search.toLowerCase()) ||
                participant.sex.toLowerCase().includes(search.toLowerCase())
            );
        })
        .sort(sortParticipants);


    // Create participants table rows based on search input
    const rows = filteredParticipants.map((element) => (
        <Table.Tr key={element.email}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.email}</Table.Td>
            <Table.Td>{element.sex}</Table.Td>
            <Table.Td>
                {formatDate(element.lastExperience)}
            </Table.Td>
            <Table.Td>
                <ActionIcon variant="subtle" onClick={() => handleEditClick(element)}>
                    <IconPencil color="blue" />
                </ActionIcon>
            </Table.Td>
            <Table.Td>
                <ActionIcon variant="subtle" onClick={() => handleDeleteClick(element.email)}>
                    <IconTrash color="red" />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Flex align={'flex-end'}>
                <SearchBar
                    searchingFor='Participant'
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    currentNumber={filteredParticipants.length}
                    totalNumber={participants.length}
                />
                <Input.Wrapper ml={'auto'} label={'Sort by'}>
                    <Select data={['Name', 'Email', 'Last Experience', 'Sex']} onChange={handleChangeSortingFunction} value={sortCriteria} />
                </Input.Wrapper>
            </Flex>
            <Card mt={16} shadow="xs">
                <Flex justify="space-between" align="center">
                    <Title size="16px">Accounts</Title>
                    <Button onClick={open}>Add Participant</Button>
                </Flex>
                {participantsLoading ? (
                    <Column align={'center'} justify={'center'} mih={200}>
                        <Loader />
                    </Column>
                ) : (
                    <ScrollArea>
                        <Table miw={660} mt={20}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th>Sex</Table.Th>
                                    <Table.Th>Last Experience</Table.Th>
                                    <Table.Th>Edit</Table.Th>
                                    <Table.Th>Delete</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </ScrollArea>
                )}
            </Card>
            <NewParticipant
                loading={loading}
                disclosure={[opened, { open, close, toggle }]}
                onCreateParticipant={handleCreateParticipant}
                initialValues={editParticipant} // Pass initial values if editing
            />
        </>
    );
}
