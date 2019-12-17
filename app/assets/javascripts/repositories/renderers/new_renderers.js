/* global ListColumnHelper ChecklistColumnHelper Status SmartAnnotation I18n GLOBAL_CONSTANTS DateTimeHelper formatJS */

$.fn.dataTable.render.newRowName = function(formId, $cell) {
  $cell.html(`
    <div class="form-group">
      <input class="form-control editing"
             form="${formId}"
             type="text"
             name="repository_row[name]"
             value=""
             data-type="RowName">
    </div>
  `);
};

$.fn.dataTable.render.newRepositoryAssetValue = function(formId, columnId, $cell) {
  $cell.html(`
    <div class="file-editing">
      <div class="file-hidden-field-container hidden"></div>
      <input class=""
             id="repository_file_${columnId}"
             form="${formId}"
             type="file"
             data-col-id="${columnId}"
             data-is-empty="true"
             value=""
             data-type="RepositoryAssetValue">
      <div class="file-upload-button new-file">
        <label for="repository_file_${columnId}">${I18n.t('repositories.table.assets.select_file_btn', { max_size: GLOBAL_CONSTANTS.FILE_MAX_SIZE_MB })}</label>
        <span class="icon"><i class="fas fa-paperclip"></i></span><span class="label-asset"></span>
        <span class="delete-action fas fa-trash"> </span>
      </div>
    </div>`);
};

$.fn.dataTable.render.newRepositoryTextValue = function(formId, columnId, $cell) {
  $cell.html(`
    <div class="form-group">
      <input class="form-control editing"
             form="${formId}"
             type="text"
             name="repository_cells[${columnId}]"
             value=""
             data-type="RepositoryTextValue">
    </div>`);

  SmartAnnotation.init($cell.find('input'));
};

$.fn.dataTable.render.newRepositoryListValue = function(formId, columnId, $cell) {
  ListColumnHelper.initialListEditMode(formId, columnId, $cell);
};

$.fn.dataTable.render.newRepositoryStatusValue = function(formId, columnId, $cell) {
  let url = $cell.closest('table').data('status-items-path');
  let hiddenField = `
    <input form="${formId}"
           type="hidden"
           name="repository_cells[${columnId}]"
           value=""
           data-type="RepositoryStatusValue">`;

  $cell.html(hiddenField + Status.initialStatusItemsRequest(columnId, '', formId, url));

  Status.initStatusSelectPicker($cell.find('select'), $cell.find(`[name='repository_cells[${columnId}]']`));
};

$.fn.dataTable.render.newRepositoryChecklistValue = function(formId, columnId, $cell) {
  ChecklistColumnHelper.initialChecklistEditMode(formId, columnId, $cell);
};

$.fn.dataTable.render.newRepositoryNumberValue = function(formId, columnId, $cell, $header) {
  let decimals = Number($header.data('metadata-decimals'));

  $cell.html(`
    <div class="form-group">
      <input class="form-control editing"
             form="${formId}"
             type="number"
             name="repository_cells[${columnId}]"
             value=""
             onchange="if (this.value !== '') { this.value = parseFloat(Number(this.value).toFixed(${decimals})); }"
             data-type="RepositoryNumberValue">
    </div>`);

  SmartAnnotation.init($cell.find('input'));
};

$.fn.dataTable.render.newRepositoryDateTimeValue = function(formId, columnId, $cell) {
  DateTimeHelper.initDateTimeEditMode(formId, columnId, $cell, '', '', '');
};

$.fn.dataTable.render.newRepositoryTimeValue = function(formId, columnId, $cell) {
  DateTimeHelper.initTimeEditMode(formId, columnId, $cell, '', '');
};

$.fn.dataTable.render.newRepositoryDateValue = function(formId, columnId, $cell) {
  DateTimeHelper.initDateEditMode(formId, columnId, $cell, '', '');
};

$.fn.dataTable.render.newRepositoryDateTimeRangeValue = function(formId, columnId, $cell) {
  // let $cell = $(cell.node());
  // let $startSpan = $cell.find('span').first();
  // let startDate = $startSpan.data('date');
  // let startTime = $startSpan.data('time');
  // let startDatetime = $startSpan.data('datetime');
  // let $endSpan = $cell.find('span').last();
  // let endDate = $endSpan.data('date');
  // let endTime = $endSpan.data('time');
  // let endDatetime = $endSpan.data('datetime');

  DateTimeHelper.initDateTimeRangeEditMode(formId, columnId, $cell, '', '', '', '', '', '');
};

$.fn.dataTable.render.newRepositoryCheckboxValue = function(formId, columnId) {
  return '';
};
