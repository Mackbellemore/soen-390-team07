import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Checkbox,
  Heading,
  IconButton,
  Select,
  Textarea,
  Table,
  Tag,
  Tbody,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Paper, TableContainer, TablePagination } from '@material-ui/core';
import { NoResultImage } from 'components/common/Image.jsx';
import Loader from 'components/common/Loader';
import { StyledTableCell, StyledTableHeader, StyledTableRow } from 'components/common/Table.jsx';
import AddDefectModal from 'components/QualityManagement/AddDefectModal.jsx';
import useQualityPartsTable from 'hooks/useQualityPartsTable.jsx';
import { Fragment } from 'react';
import usePagination from 'hooks/usePagination.jsx';
import DefectsFilter from './DefectsFilter.jsx';
import useDefectSearchFilter from 'hooks/useDefectSearchFilter.jsx';
import Search from '../common/Search.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';

const Parts = () => {
  const {
    handleStatusColor,
    isSelected,
    handleSelectAllClick,
    handleOnChange,
    handleDelete,
    handleEdit,
    isEditing,
    setEditing,
    isLoading,
    isSuccess,
    data,
    selected,
    newDescription,
    newStatus,
  } = useQualityPartsTable();
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = usePagination();
  const { handleFilter, handleSearch, searchFilterData } = useDefectSearchFilter();

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Defects
        </Heading>
        <AddDefectModal showButton={true} />
        <NoResultImage />
      </>
    );
  }

  return (
    <>
      <AddDefectModal />
      <DefectsFilter handleFilter={handleFilter} />
      <IconButton
        colorScheme="blue"
        variant="outline"
        aria-label="delete"
        float="right"
        m={2}
        icon={<DeleteIcon />}
        onClick={handleDelete}
        isDisabled={selected.length === 0}
      />
      <Search handleSearch={handleSearch} />
      <Box overflowX="auto">
        <TableContainer component={Paper}>
          <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
            <Thead>
              <Tr>
                <StyledTableHeader>
                  <Checkbox
                    isIndeterminate={selected.length > 0 && selected.length < data.data.length}
                    isChecked={data.data.length > 0 && selected.length === data.data.length}
                    onChange={handleSelectAllClick}
                  >
                    Ticket ID
                  </Checkbox>
                </StyledTableHeader>
                <StyledTableHeader>Product Name</StyledTableHeader>
                <StyledTableHeader>Defect Type</StyledTableHeader>
                <StyledTableHeader>Status of Defect</StyledTableHeader>
                <StyledTableHeader>Desc of Solution</StyledTableHeader>
                <StyledTableHeader />
              </Tr>
            </Thead>
            <Tbody>
              {isSuccess &&
                searchFilterData(data.data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((defect) => (
                    <Fragment key={defect._id}>
                      <StyledTableRow>
                        <StyledTableCell>
                          <Checkbox
                            onChange={(event) => handleOnChange(event, defect._id)}
                            isChecked={isSelected(defect._id)}
                          >
                            {defect.id}
                          </Checkbox>
                        </StyledTableCell>
                        <StyledTableCell>{defect.partName}</StyledTableCell>
                        <StyledTableCell>
                          <Tag
                            size="md"
                            variant="solid"
                            colorScheme={defect.type === 'Broken' ? 'red' : 'orange'}
                          >
                            {defect.type}
                          </Tag>
                        </StyledTableCell>
                        <StyledTableCell>
                          {isEditing(defect._id) ? (
                            <Select ref={newStatus} size="sm" defaultValue={defect.status}>
                              <option value="Solved">Solved</option>
                              <option value="Pending">Pending</option>
                              <option value="Ongoing">Ongoing</option>
                            </Select>
                          ) : (
                            <Tag
                              size="md"
                              variant="solid"
                              colorScheme={handleStatusColor(defect.status)}
                            >
                              {defect.status}
                            </Tag>
                          )}
                        </StyledTableCell>
                        <StyledTableCell width="30%">
                          {isEditing(defect._id) ? (
                            <Textarea
                              size="sm"
                              rows="2"
                              ref={newDescription}
                              defaultValue={defect.description}
                            />
                          ) : (
                            defect.description
                          )}
                        </StyledTableCell>
                        <StyledTableCell width="10%">
                          {isEditing(defect._id) ? (
                            <>
                              <IconButton
                                size="xs"
                                mr="2"
                                icon={<CheckIcon />}
                                onClick={handleEdit}
                              />
                              <IconButton
                                size="xs"
                                icon={<CloseIcon />}
                                onClick={() => setEditing('')}
                              />
                            </>
                          ) : (
                            <IconButton
                              size="sm"
                              icon={<EditIcon />}
                              onClick={() => setEditing(defect._id)}
                            />
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    </Fragment>
                  ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={data.data.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ExportFiles section="parts_defects" data={data.data} />
    </>
  );
};

export default Parts;
