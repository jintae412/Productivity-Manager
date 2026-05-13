import DateTimePicker from '@react-native-community/datetimepicker';
import { useLayoutEffect, useState } from 'react';
import {
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { addTask, selectAllTags, selectTaskById, updateTask } from '../features';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { TasksStackScreenProps } from '../navigation/types';

export function TaskFormScreen({ navigation, route }: TasksStackScreenProps<'TaskForm'>) {
    // taskId should be null for new tasks, and non-null if editing
	const { taskId } = route.params ?? {};
    const isEditing = !!taskId;

    const dispatch = useAppDispatch();
    const existingTask = useAppSelector(taskId ? selectTaskById(taskId) : () => undefined);
    const allTags = useAppSelector(selectAllTags);

    const [title, setTitle] = useState(existingTask?.title ?? '');
    const [notes, setNotes] = useState(existingTask?.notes ?? '');
    const [tags, setTags] = useState<string[]>(existingTask?.tags ?? []);
    const [tagInput, setTagInput] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(
        existingTask?.dueDate ? new Date(existingTask.dueDate) : null,
    );
    const [showDatePicker, setShowDatePicker] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({ title: isEditing ? 'Edit Task' : 'New Task' });
    }, [navigation, isEditing]);

    function addTagFromInput(raw: string) {
        const trimmed = raw.trim().toLowerCase();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
        }
        setTagInput('');
    }

    function removeTag(tag: string) {
        setTags(tags.filter((t) => t !== tag));
    }

    function handleSave() {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) return;

        const payload = {
            title: trimmedTitle,
            notes: notes.trim() || null,
            dueDate: dueDate ? dueDate.toISOString() : null,
            tags,
        };

        if (isEditing && taskId) {
            dispatch(updateTask({ id: taskId, ...payload }));
        } else {
            dispatch(addTask(payload));
        }

        navigation.goBack();
    }

    const tagSuggestions = allTags.filter((t) => !tags.includes(t));

    return (
        <View style={styles.screen}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >

                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Task title"
                    placeholderTextColor="#8E8E93"
                    autoFocus={!isEditing}
                    returnKeyType="next"
                />

                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={[styles.input, styles.notesInput]}
                    value={notes ?? ''}
                    onChangeText={setNotes}
                    placeholder="Optional notes"
                    placeholderTextColor="#8E8E93"
                    multiline
                    textAlignVertical="top"
                />

                <Text style={styles.label}>Tags</Text>
                {tags.length > 0 && (
                    <View style={styles.chipRow}>
                        {tags.map((tag) => (
                            <Pressable key={tag} style={styles.selectedChip} onPress={() => removeTag(tag)}>
                                <Text style={styles.selectedChipText}>{tag}</Text>
                                <Text style={styles.chipRemove}>×</Text>
                            </Pressable>
                        ))}
                    </View>
                )}
                <View style={styles.tagInputRow}>
                    <TextInput
                        style={styles.tagInput}
                        value={tagInput}
                        onChangeText={setTagInput}
                        placeholder="Add a tag…"
                        placeholderTextColor="#8E8E93"
                        returnKeyType="done"
                        onSubmitEditing={() => addTagFromInput(tagInput)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        blurOnSubmit={false}
                    />
                    {tagInput.trim().length > 0 && (
                        <Pressable style={styles.tagAddButton} onPress={() => addTagFromInput(tagInput)}>
                            <Text style={styles.tagAddText}>Add</Text>
                        </Pressable>
                    )}
                </View>
                {tagSuggestions.length > 0 && (
                    <View style={styles.chipRow}>
                        {tagSuggestions.map((tag) => (
                            <Pressable key={tag} style={styles.suggestionChip} onPress={() => addTagFromInput(tag)}>
                                <Text style={styles.suggestionChipText}>+ {tag}</Text>
                            </Pressable>
                        ))}
                    </View>
                )}

                <Text style={styles.label}>Due Date</Text>
                <View style={styles.dateRow}>
                    <Pressable style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                        <Text style={[styles.dateButtonText, !dueDate && styles.datePlaceholder]}>
                            {dueDate ? dueDate.toLocaleDateString() : 'No due date'}
                        </Text>
                    </Pressable>
                    {dueDate && (
                        <Pressable style={styles.clearDate} onPress={() => setDueDate(null)}>
                            <Text style={styles.clearDateText}>Clear</Text>
                        </Pressable>
                    )}
                </View>

                {showDatePicker && Platform.OS === 'android' && (
                    <DateTimePicker
                        value={dueDate ?? new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowDatePicker(false);
                            if (event.type === 'set' && date) setDueDate(date);
                        }}
                    />
                )}
            </ScrollView>

            {Platform.OS === 'ios' && (
                <Modal
                    visible={showDatePicker}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowDatePicker(false)}
                >
                    <Pressable style={styles.backdrop} onPress={() => setShowDatePicker(false)} />
                    <View style={styles.dateSheet}>
                        <View style={styles.dateSheetHeader}>
                            <Pressable onPress={() => setShowDatePicker(false)}>
                                <Text style={styles.dateSheetDone}>Done</Text>
                            </Pressable>
                        </View>
                        <DateTimePicker
                            value={dueDate ?? new Date()}
                            mode="date"
                            display="spinner"
                            onChange={(_, date) => {
                                if (date) setDueDate(date);
                            }}
                        />
                    </View>
                </Modal>
            )}

            <View style={styles.footer}>
                <Pressable
                    style={[styles.saveButton, !title.trim() && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    disabled={!title.trim()}
                >
                    <Text style={styles.saveButtonText}>{isEditing ? 'Save Changes' : 'Add Task'}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    scroll: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#8E8E93',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 6,
        marginTop: 20,
    },
    input: {
        fontSize: 16,
        color: '#1C1C1E',
        backgroundColor: '#FFFFFF',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#D1D1D6',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    notesInput: {
        minHeight: 90,
        paddingTop: 10,
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    selectedChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 4,
    },
    selectedChipText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    chipRemove: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 18,
    },
    tagInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    tagInput: {
        flex: 1,
        fontSize: 16,
        color: '#1C1C1E',
        backgroundColor: '#FFFFFF',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#D1D1D6',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    tagAddButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    tagAddText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    suggestionChip: {
        backgroundColor: '#E5E5EA',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    suggestionChipText: {
        fontSize: 14,
        color: '#1C1C1E',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dateButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#D1D1D6',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    dateButtonText: {
        fontSize: 16,
        color: '#1C1C1E',
    },
    datePlaceholder: {
        color: '#8E8E93',
    },
    clearDate: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    clearDateText: {
        fontSize: 15,
        color: '#FF3B30',
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    dateSheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingBottom: 32,
    },
    dateSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 4,
    },
    dateSheetDone: {
        fontSize: 17,
        color: '#007AFF',
        fontWeight: '600',
    },
    footer: {
        padding: 16,
        paddingBottom: 32,
        backgroundColor: '#F9F9F9',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#D1D1D6',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    saveButtonDisabled: {
        backgroundColor: '#007AFF66',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
    },
});
