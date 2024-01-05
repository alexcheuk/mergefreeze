import { MergeFreezeStatusDTO } from '../../../merge-freeze-status/interfaces/dtos/merge-freeze-status-dto'

export interface SetUnfrozenStatusDTO
  extends Omit<MergeFreezeStatusDTO, 'isFrozen' | 'reason'> {}
