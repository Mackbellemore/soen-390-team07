import { Heading, Table, Tbody, Thead, Tr, Box } from '@chakra-ui/react';
import Loader from 'components/common/Loader.jsx';
import { StyledTableHeader } from 'components/common/Table.jsx';
import { Fragment } from 'react';
import { useQuery } from 'react-query';
import usePagination from 'hooks/usePagination';
import { TablePagination } from '@material-ui/core';
import { getAuditTrail } from 'utils/api/auditTrail.js';
import AuditTrailTableRow from '../AuditTrail/AuditTrailTableRow.jsx';
import Search from '../common/Search.jsx';
import useSearch from 'hooks/useSearch.jsx';
import ExportFiles from 'components/common/ExportFiles.jsx';

const AuditTrailTable = () => {
  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } = usePagination();
  const { isLoading, isSuccess, data } = useQuery('audit', getAuditTrail);
  const { setSearchInput, searchData } = useSearch();

  let exportData = [];

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <>
        <Heading size="xl" textAlign="center" mt={5}>
          No Logs to Show
        </Heading>
      </>
    );
  }

  if (isSuccess) {
    exportData = data.data;
    delete exportData.meta;
  }

  return (
    <>
      <Search handleSearch={setSearchInput} />
      <Box overflowX="auto">
        <Table minWidth="unset" width="100%" variant="striped" colorScheme="light">
          <Thead>
            <Tr>
              <StyledTableHeader>User</StyledTableHeader>
              <StyledTableHeader>Action</StyledTableHeader>
              <StyledTableHeader>Date</StyledTableHeader>
              <StyledTableHeader>More Info</StyledTableHeader>
            </Tr>
          </Thead>
          <Tbody>
            {isSuccess &&
              searchData(data.data)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((log, index) => (
                  <Fragment key={index}>
                    <AuditTrailTableRow log={log} />
                  </Fragment>
                ))}
          </Tbody>
        </Table>
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
      <ExportFiles section="audits" data={exportData} />
    </>
  );
};

export default AuditTrailTable;
