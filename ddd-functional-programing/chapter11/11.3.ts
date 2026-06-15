type Workflow = (i: MyInputType) => MyOutputType;

type JsonString = string;
type DeserializeInputDto = (i: JsonString) => MyInputDto;
type InputDtoToDomain = (i: MyInputDto) => MyInputType;

type OutputDtoFromDomain = (i: MyOutputType) => MyOutputDto;
type SerializeOutputDto = (i: MyOutputDto) => JsonString;

const workflowWithSerialization = flow(
  deserializeInputDto, // JSON에서 DTO로 변환
  inputDtoToDomain, // DTO에서 도메인 객체로 변환
  workflow, // 도메인의 핵심 작업 흐름 실행
  outputDtoFromDomain, // 도메인 객체에서 DTO로 변환
  serializeOutputDto, // DTO에서 JSON으로 변환
) // 최종 출력은 JsonString