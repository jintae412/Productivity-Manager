import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { addTask } from '../features';
import { useAppDispatch } from '../hooks';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export function CreateTaskModal({ visible, onClose }: Props) {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');

    function handleAdd() {
        const trimmed = title.trim();
        if (!trimmed) {
			return;
		}

        dispatch(addTask({
			title: trimmed,
			notes: '',
			dueDate: null,
			tags: []
		}));

        onClose();
    }

    function handleClose() {
        setTitle('');
        onClose();
    }

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
            <Pressable style={styles.backdrop} onPress={handleClose} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.sheet}>
                    <View style={styles.handle} />
                    <Text style={styles.heading}>New Task</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Task title"
                        placeholderTextColor="#8E8E93"
                        value={title}
                        onChangeText={setTitle}
                        autoFocus
                        returnKeyType="done"
                        onSubmitEditing={handleAdd}
                    />
                    <View style={styles.actions}>
                        <Pressable style={styles.cancelButton} onPress={handleClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.addButton, !title.trim() && styles.addButtonDisabled]}
                            onPress={handleAdd}
                            disabled={!title.trim()}
                        >
                            <Text style={styles.addText}>Add Task</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    keyboardView: {
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 12,
    },
    handle: {
        alignSelf: 'center',
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#D1D1D6',
        marginBottom: 20,
    },
    heading: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 16,
    },
    input: {
        fontSize: 16,
        color: '#1C1C1E',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#D1D1D6',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 20,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#D1D1D6',
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 16,
        color: '#8E8E93',
        fontWeight: '500',
    },
    addButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: '#007AFF',
        alignItems: 'center',
    },
    addButtonDisabled: {
        backgroundColor: '#007AFF66',
    },
    addText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },
});
