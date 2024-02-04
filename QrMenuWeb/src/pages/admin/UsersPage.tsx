import { useEffect, useMemo, useState } from 'react';
import { Box, Button, IconButton, Popover, Tooltip, Typography, useTheme } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import * as UserService from '../../services/usersService';
import * as CompaniesService from '../../services/companiesService';
import * as Messages from '../../utils/messages';
import ListUsersResponse from '../../services/usersService/responseModels/ListUsersResponse';
import AddIcon from '@mui/icons-material/Add';
import Loader from '../../components/shared/Loader';
import Dialog from '../../components/shared/Dialog';
import AddUserDialog from '../../components/pages/admin/AddUserDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StoreIcon from '@mui/icons-material/Store';
import UpdateUserDialog from '../../components/pages/admin/UpdateUserDialog';
import AddCompanyDialog from '../../components/pages/admin/AddCompanyDialog';
import GetCompanyByUserIdResponse from '../../services/companiesService/responseModels/GetCompanyByUserIdResponse';

const UsersPage = () => {
    const theme = useTheme();

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<Array<ListUsersResponse>>([]);
    const [addUserOpen, setAddUserOpen] = useState(false);
    const [updateUserOpen, setUpdateUserOpen] = useState(false);
    const [addCompanyOpen, setAddCompanyOpen] = useState(false);
    const [companyInfoAnchorPosition, setCompanyInfoAnchorPosition] = useState<any>(null);
    const [selectedCompany, setSelectedCompany] = useState<GetCompanyByUserIdResponse | null>(null);
    const [selectedUser, setSelectedUser] = useState<ListUsersResponse | null>(null);
    const [confirmDeleteElPosition, setConfirmDeleteElPosition] = useState<any>(null);

    const colDefs = useMemo<ColDef[]>(
        () => [
            {
                headerName: 'Aktif',
                field: 'isActive',
                width: 70,
                cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
            },
            { headerName: 'Id', field: 'id', width: 310 },
            { headerName: 'İsim', field: 'name', flex: 1 },
            { headerName: 'Kullanıcı İsmi', field: 'userName' },
            { headerName: 'Email', field: 'email', flex: 1 },
            { headerName: 'Rol', field: 'role' },
            { headerName: 'Oluşturulma Tarihi', field: 'createdDate' },
            {
                width: 150,
                cellRenderer: (params: ICellRendererParams) => (
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <Tooltip title='Şirket'>
                            <IconButton
                                color='info'
                                onClick={async (e) => {
                                    try {
                                        const response = await CompaniesService.getCompanyByUserId(
                                            params.data.id
                                        );
                                        setSelectedCompany(response.data.data);
                                        setCompanyInfoAnchorPosition({
                                            top: e.clientY,
                                            left: e.clientX,
                                        });
                                    } catch (error) {
                                        setSelectedUser(params.data);
                                        setAddCompanyOpen(true);
                                    }
                                }}
                            >
                                <StoreIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Düzenle'>
                            <IconButton
                                color='warning'
                                onClick={() => {
                                    setSelectedUser(params.data);
                                    setUpdateUserOpen(true);
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Sil'>
                            <IconButton
                                color='error'
                                onClick={(e) => {
                                    if (!params.data.isActive) {
                                        Messages.warningMessage(
                                            'İlgili kullanıcı zaten silinmiş, aktif değil.'
                                        );
                                        return;
                                    }
                                    setSelectedUser(params.data);
                                    setConfirmDeleteElPosition({ top: e.clientY, left: e.clientX });
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
            },
        ],
        []
    );

    useEffect(() => {
        listUsers();
    }, []);

    const listUsers = async () => {
        setLoading(true);
        try {
            const response = await UserService.listUsers();
            setUsers(response.data.data ?? []);
        } catch (error) {
            Messages.errorMessage('Kullanıcılar listelenemedi');
        }
        setLoading(false);
    };

    const onConfirmDelete = async () => {
        try {
            await UserService.deleteUser(selectedUser?.id ?? '');
            Messages.successMessage('Kullanıcı silindi');
            await listUsers();
        } catch (error) {
            Messages.errorMessage('Kullanıcı silinemedi');
        }
        setConfirmDeleteElPosition(null);
    };

    return (
        <>
            {loading && <Loader />}
            <Box style={{ marginBottom: '16px' }}>
                <Button
                    variant='contained'
                    startIcon={<AddIcon />}
                    onClick={() => setAddUserOpen(true)}
                >
                    Kullanıcı Oluştur
                </Button>
            </Box>
            <div
                className={
                    theme.palette.mode === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'
                }
                style={{ height: 'calc(100% - 52px)' }}
            >
                <AgGridReact rowData={users} columnDefs={colDefs} />
            </div>

            {addUserOpen && (
                <Dialog open={addUserOpen} onClose={() => setAddUserOpen(false)} width={400}>
                    <AddUserDialog onClose={() => setAddUserOpen(false)} refreshPage={listUsers} />
                </Dialog>
            )}

            {companyInfoAnchorPosition && selectedCompany && (
                <Popover
                    open={Boolean(companyInfoAnchorPosition)}
                    anchorReference='anchorPosition'
                    anchorPosition={companyInfoAnchorPosition}
                    onClose={() => setCompanyInfoAnchorPosition(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Box sx={{ p: 2 }}>
                        <Box marginBottom={2}>
                            <Typography>Şirket Adı: {selectedCompany.name}</Typography>
                            <Typography>
                                Bitiş Tarihi: {selectedCompany.dismissalDate.toString()}
                            </Typography>
                            <Typography>
                                Ödeme Yapıldı mı?: {selectedCompany.isPay ? '✅' : '❌'}
                            </Typography>
                        </Box>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={() => setCompanyInfoAnchorPosition(null)}
                        >
                            Kapat
                        </Button>
                    </Box>
                </Popover>
            )}

            {addCompanyOpen && selectedUser?.id && (
                <AddCompanyDialog
                    open={addCompanyOpen}
                    userId={selectedUser.id}
                    onClose={() => setAddCompanyOpen(false)}
                    refreshPage={listUsers}
                />
            )}

            {updateUserOpen && selectedUser && (
                <Dialog open={updateUserOpen} onClose={() => setUpdateUserOpen(false)} width={400}>
                    <UpdateUserDialog
                        user={selectedUser}
                        onClose={() => setUpdateUserOpen(false)}
                        refreshPage={listUsers}
                    />
                </Dialog>
            )}

            {confirmDeleteElPosition && (
                <Popover
                    open={Boolean(confirmDeleteElPosition)}
                    anchorReference='anchorPosition'
                    anchorPosition={confirmDeleteElPosition}
                    onClose={() => setConfirmDeleteElPosition(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography>Silinmesini onaylıyor musun?</Typography>
                        <Box display='flex' marginTop={2} justifyContent='center'>
                            <Button
                                sx={{ marginRight: 2 }}
                                variant='contained'
                                color='error'
                                onClick={() => setConfirmDeleteElPosition(null)}
                            >
                                Hayır
                            </Button>
                            <Button variant='contained' color='success' onClick={onConfirmDelete}>
                                Evet
                            </Button>
                        </Box>
                    </Box>
                </Popover>
            )}
        </>
    );
};

export default UsersPage;
