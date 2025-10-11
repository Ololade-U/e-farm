import { Table, Skeleton } from "@chakra-ui/react";


const TableSkeleton = () => {
  return (
    <>
      <Table.Row>
        <Table.Cell colSpan={7}>
          <Skeleton py={"2.5rem"} w={"100%"} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan={7}>
          <Skeleton py={"2.5rem"} w={"100%"} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan={7}>
          <Skeleton py={"2.5rem"} w={"100%"} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan={7}>
          <Skeleton py={"2.5rem"} w={"100%"} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan={7}>
          <Skeleton py={"2.5rem"} w={"100%"} />
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default TableSkeleton;
