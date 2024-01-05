import { MergeFreezeStatusDTO } from '../../../merge-freeze-status/interfaces/dtos/merge-freeze-status-dto'

export interface SetFrozenStatusDTO
  extends Omit<MergeFreezeStatusDTO, 'isFrozen'> {}
